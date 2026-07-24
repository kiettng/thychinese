document.addEventListener('DOMContentLoaded', () => {
    // --- State & Storage ---
    let currentLevel = 'hsk1';
    let currentView = 'dashboard';
    let userData = {
        learned: [], // array of word IDs
        bookmarks: [], // array of word IDs
        streak: 0,
        lastLearnDate: null
    };

    function initStorage() {
        const saved = localStorage.getItem('thyChineseData');
        if (saved) {
            userData = JSON.parse(saved);
        }
        checkStreak();
    }

    function saveStorage() {
        localStorage.setItem('thyChineseData', JSON.stringify(userData));
        updateProgressUI();
    }

    function checkStreak() {
        if (!userData.lastLearnDate) return;
        const lastDate = new Date(userData.lastLearnDate);
        const today = new Date();
        const diffTime = Math.abs(today - lastDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
            // Streak broken
            userData.streak = 0;
            saveStorage();
        }
    }

    function recordLearnAction() {
        const todayStr = new Date().toDateString();
        if (userData.lastLearnDate !== todayStr) {
            userData.streak += 1;
            userData.lastLearnDate = todayStr;
            saveStorage();
            document.getElementById('streak-count').innerText = userData.streak;
        }
    }

    function markLearned(id) {
        if (!userData.learned.includes(id)) {
            userData.learned.push(id);
            saveStorage();
        }
        recordLearnAction();
    }

    function toggleBookmark(id) {
        const index = userData.bookmarks.indexOf(id);
        if (index > -1) {
            userData.bookmarks.splice(index, 1);
        } else {
            userData.bookmarks.push(id);
        }
        saveStorage();
        // re-render current view to reflect icon change
        if (currentView === 'vocabulary' || currentView === 'search' || currentView === 'bookmarks') {
            renderView();
        }
    }

    // --- Web Speech API ---
    window.speak = function(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            speechSynthesis.speak(utterance);
        } else {
            alert("Trình duyệt của bạn không hỗ trợ phát âm.");
        }
    };

    // --- Helpers ---
    function getAllVocab() {
        let all = [];
        for (let lvl in appData) {
            all = all.concat(appData[lvl].vocabulary);
        }
        return all;
    }

    function getWordById(id) {
        return getAllVocab().find(w => w.id === id);
    }

    // --- Navigation & UI ---
    const levelSelector = document.getElementById('level-selector');
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');
    
    function updateProgressUI() {
        const container = document.getElementById('progress-container');
        container.innerHTML = '';
        
        for (let lvl in appData) {
            const total = appData[lvl].vocabulary.length;
            const learnedInLvl = appData[lvl].vocabulary.filter(w => userData.learned.includes(w.id)).length;
            const percent = total > 0 ? Math.round((learnedInLvl / total) * 100) : 0;
            
            container.innerHTML += `
                <div class="progress-item">
                    <div class="progress-label">
                        <span>${lvl.toUpperCase()}</span>
                        <span>${percent}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${percent}%"></div>
                    </div>
                </div>
            `;
        }
        document.getElementById('streak-count').innerText = userData.streak;
    }

    function setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item, .bottom-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                if(!view) return;
                
                // Update active state
                navItems.forEach(nav => nav.classList.remove('active'));
                // activate both desktop and mobile items
                document.querySelectorAll(`[data-view="${view}"]`).forEach(el => el.classList.add('active'));
                
                currentView = view;
                
                // Set title
                const titleSpan = item.querySelector('span');
                pageTitle.innerText = titleSpan ? titleSpan.innerText : view.toUpperCase();
                
                renderView();
            });
        });

        levelSelector.addEventListener('change', (e) => {
            currentLevel = e.target.value;
            renderView();
        });
    }

    // --- Renderers ---
    function renderVocabRow(word, lvlTag = "") {
        const isBookmarked = userData.bookmarks.includes(word.id);
        const isLearned = userData.learned.includes(word.id);
        const trClass = isLearned ? 'style="background-color: #f0fdf4;"' : '';
        
        return `
            <tr ${trClass}>
                <td class="td-hanzi hanzi">${word.hanzi} ${lvlTag ? `<span class="level-tag">${lvlTag.toUpperCase()}</span>` : ''}</td>
                <td>
                    <div class="td-pinyin">${word.pinyin}</div>
                    <div class="type-tag mt-1">${word.type || 'N/A'}</div>
                </td>
                <td class="td-meaning">${word.meaning}</td>
                <td class="td-actions">
                    <button class="btn-icon" onclick="speak('${word.hanzi}')" title="Phát âm"><i class="fa-solid fa-volume-high"></i></button>
                    <button class="btn-icon ${isBookmarked ? 'active-star' : ''}" onclick="window.toggleBookmarkHandler('${word.id}')" title="Yêu thích">
                        <i class="fa-solid fa-star"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    // Export handler for inline HTML
    window.toggleBookmarkHandler = function(id) { toggleBookmark(id); };

    function renderView() {
        const data = appData[currentLevel];
        contentArea.innerHTML = '';
        const section = document.createElement('div');
        section.className = 'view-section';

        if (currentView === 'dashboard') {
            section.innerHTML = `
                <div class="dashboard-grid">
                    <div class="stat-card glass">
                        <div class="stat-icon"><i class="fa-solid fa-book-open"></i></div>
                        <h3>Từ vựng đã học</h3>
                        <p>${userData.learned.length}</p>
                    </div>
                    <div class="stat-card glass">
                        <div class="stat-icon"><i class="fa-solid fa-star"></i></div>
                        <h3>Từ yêu thích</h3>
                        <p>${userData.bookmarks.length}</p>
                    </div>
                    <div class="stat-card glass" onclick="document.querySelector('.nav-item[data-view=\\'quiz\\']').click()" style="cursor: pointer">
                        <div class="stat-icon"><i class="fa-solid fa-gamepad"></i></div>
                        <h3>Làm bài tập Quiz</h3>
                        <p>-></p>
                    </div>
                </div>
            `;
        } 
        else if (currentView === 'vocabulary') {
            const types = [...new Set(data.vocabulary.map(w => w.type))].filter(Boolean);
            let typeOptions = types.map(t => `<option value="${t}">${t}</option>`).join('');
            
            section.innerHTML = `
                <div class="toolbar">
                    <select id="type-filter" class="filter-select">
                        <option value="all">Tất cả từ loại</option>
                        ${typeOptions}
                    </select>
                    <button class="btn btn-primary" id="btn-flashcard"><i class="fa-solid fa-clone"></i> Học Flashcard</button>
                </div>
                <div class="vocab-table-container glass">
                    <table class="vocab-table">
                        <thead><tr><th>Hán tự</th><th>Phiên âm</th><th>Nghĩa</th><th>Hành động</th></tr></thead>
                        <tbody id="vocab-tbody"></tbody>
                    </table>
                </div>
            `;
            contentArea.appendChild(section);

            const tbody = document.getElementById('vocab-tbody');
            const typeFilter = document.getElementById('type-filter');
            
            const renderTable = (filter) => {
                const list = filter === 'all' ? data.vocabulary : data.vocabulary.filter(w => w.type === filter);
                tbody.innerHTML = list.length ? list.map(w => renderVocabRow(w)).join('') : '<tr><td colspan="4">Không có dữ liệu.</td></tr>';
            };
            
            renderTable('all');
            typeFilter.addEventListener('change', (e) => renderTable(e.target.value));
            
            document.getElementById('btn-flashcard').addEventListener('click', () => {
                currentView = 'flashcard';
                renderView();
            });
            return; // already appended
        }
        else if (currentView === 'flashcard') {
            let list = [...data.vocabulary].sort(() => 0.5 - Math.random()); // Shuffle
            if(list.length === 0) {
                section.innerHTML = '<p>Không có từ vựng để học.</p>';
                contentArea.appendChild(section);
                return;
            }

            let currentIndex = 0;
            const renderCard = () => {
                if(currentIndex >= list.length) {
                    section.innerHTML = `
                        <div class="quiz-result glass">
                            <h2>Hoàn thành Flashcard!</h2>
                            <button class="btn btn-primary" onclick="document.querySelector('.nav-item[data-view=\\'vocabulary\\']').click()">Quay lại Từ vựng</button>
                        </div>
                    `;
                    return;
                }
                const word = list[currentIndex];
                section.innerHTML = `
                    <div class="toolbar">
                        <button class="btn btn-outline" onclick="document.querySelector('.nav-item[data-view=\\'vocabulary\\']').click()"><i class="fa-solid fa-arrow-left"></i> Quay lại</button>
                        <span>Thẻ ${currentIndex + 1} / ${list.length}</span>
                    </div>
                    <div class="flashcard-wrapper">
                        <div class="flashcard glass" id="fc" onclick="this.classList.toggle('flipped')">
                            <div class="flashcard-inner">
                                <div class="flashcard-front">
                                    <div class="fc-hanzi hanzi">${word.hanzi}</div>
                                    <div class="fc-pinyin">${word.pinyin}</div>
                                    <p class="text-muted" style="margin-top: 20px;"><i class="fa-solid fa-hand-pointer"></i> Chạm để xem nghĩa</p>
                                </div>
                                <div class="flashcard-back">
                                    <div class="fc-meaning">${word.meaning}</div>
                                </div>
                            </div>
                        </div>
                        <div class="fc-controls">
                            <button class="btn btn-danger" id="btn-fail"><i class="fa-solid fa-xmark"></i> Chưa nhớ</button>
                            <button class="btn btn-icon" onclick="speak('${word.hanzi}')"><i class="fa-solid fa-volume-high"></i></button>
                            <button class="btn btn-success" id="btn-pass"><i class="fa-solid fa-check"></i> Đã nhớ</button>
                        </div>
                    </div>
                `;

                section.querySelector('#btn-fail').addEventListener('click', () => { currentIndex++; renderCard(); });
                section.querySelector('#btn-pass').addEventListener('click', () => {
                    markLearned(word.id);
                    currentIndex++;
                    renderCard();
                });
            };
            renderCard();
        }
        else if (currentView === 'grammar') {
            if(data.grammar.length === 0) {
                section.innerHTML = '<p>Chưa có dữ liệu ngữ pháp.</p>';
            } else {
                let html = '<div class="grammar-list">';
                data.grammar.forEach(item => {
                    html += `
                        <div class="grammar-item glass">
                            <h3 class="grammar-title">${item.title}</h3>
                            <p class="grammar-desc">${item.description}</p>
                            <div class="grammar-example">
                                <div class="ex-content">
                                    <div class="ex-hanzi hanzi">${item.example.hanzi}</div>
                                    <div class="ex-pinyin">${item.example.pinyin}</div>
                                    <div class="ex-meaning">${item.example.meaning}</div>
                                </div>
                                <button class="btn-icon" onclick="speak('${item.example.hanzi}')"><i class="fa-solid fa-volume-high"></i></button>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
                section.innerHTML = html;
            }
        }
        else if (currentView === 'quiz') {
            if(data.vocabulary.length < 4) {
                section.innerHTML = '<p>Cần ít nhất 4 từ vựng trong cấp độ này để làm Quiz.</p>';
                contentArea.appendChild(section);
                return;
            }
            
            // Generate 10 questions
            let questions = [];
            let vocabList = [...data.vocabulary].sort(() => 0.5 - Math.random());
            let qCount = Math.min(10, vocabList.length);
            
            for(let i=0; i<qCount; i++) {
                let correctWord = vocabList[i];
                let wrongs = data.vocabulary.filter(w => w.id !== correctWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
                let options = [correctWord, ...wrongs].sort(() => 0.5 - Math.random());
                questions.push({ word: correctWord, options: options });
            }

            let qIndex = 0;
            let score = 0;

            const renderQ = () => {
                if(qIndex >= questions.length) {
                    section.innerHTML = `
                        <div class="quiz-result glass">
                            <h2>Kết quả: ${score} / ${questions.length}</h2>
                            <p>Bạn đã hoàn thành bài kiểm tra!</p>
                            <button class="btn btn-primary" style="margin-top:20px" onclick="document.querySelector('.nav-item[data-view=\\'dashboard\\']').click()">Về trang chủ</button>
                        </div>
                    `;
                    return;
                }

                let q = questions[qIndex];
                let optsHtml = q.options.map((opt, i) => `
                    <button class="quiz-option" data-id="${opt.id}">${opt.meaning}</button>
                `).join('');

                section.innerHTML = `
                    <div class="quiz-container glass">
                        <div class="quiz-header">
                            <span>Câu ${qIndex + 1} / ${questions.length}</span>
                            <span>Điểm: ${score}</span>
                        </div>
                        <div class="quiz-question-box">
                            <div class="quiz-hanzi hanzi">${q.word.hanzi}</div>
                            <button class="btn-icon" style="margin-top: 10px" onclick="speak('${q.word.hanzi}')"><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                        <div class="quiz-options">
                            ${optsHtml}
                        </div>
                    </div>
                `;

                const btns = section.querySelectorAll('.quiz-option');
                btns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        // disable all
                        btns.forEach(b => b.disabled = true);
                        const isCorrect = this.getAttribute('data-id') === q.word.id;
                        if(isCorrect) {
                            this.classList.add('correct');
                            score++;
                            markLearned(q.word.id);
                        } else {
                            this.classList.add('wrong');
                            // highlight correct
                            section.querySelector(`.quiz-option[data-id="${q.word.id}"]`).classList.add('correct');
                        }
                        
                        setTimeout(() => {
                            qIndex++;
                            renderQ();
                        }, 1500);
                    });
                });
            };
            renderQ();
        }
        else if (currentView === 'search') {
            section.innerHTML = `
                <div class="toolbar">
                    <input type="text" id="search-input" class="search-input" placeholder="Nhập Hán tự, Pinyin hoặc nghĩa tiếng Việt...">
                </div>
                <div class="vocab-table-container glass">
                    <table class="vocab-table">
                        <thead><tr><th>Hán tự</th><th>Phiên âm</th><th>Nghĩa</th><th>Hành động</th></tr></thead>
                        <tbody id="search-tbody"><tr><td colspan="4" style="text-align:center">Nhập từ khóa để tìm kiếm</td></tr></tbody>
                    </table>
                </div>
            `;
            contentArea.appendChild(section);

            const input = document.getElementById('search-input');
            const tbody = document.getElementById('search-tbody');
            const allWords = getAllVocab();

            input.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase().trim();
                if(!term) {
                    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center">Nhập từ khóa để tìm kiếm</td></tr>';
                    return;
                }

                const results = allWords.filter(w => 
                    w.hanzi.includes(term) || 
                    w.pinyin.toLowerCase().includes(term) || 
                    w.meaning.toLowerCase().includes(term)
                ).slice(0, 50); // limit 50

                if(results.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center">Không tìm thấy kết quả.</td></tr>';
                } else {
                    // find level for tag
                    tbody.innerHTML = results.map(w => {
                        let lvlTag = Object.keys(appData).find(lvl => appData[lvl].vocabulary.find(x => x.id === w.id)) || '';
                        return renderVocabRow(w, lvlTag);
                    }).join('');
                }
            });
            
            // Autofocus
            setTimeout(() => input.focus(), 100);
            return;
        }
        else if (currentView === 'bookmarks') {
            const allWords = getAllVocab();
            const bookmarkedWords = userData.bookmarks.map(id => allWords.find(w => w.id === id)).filter(Boolean);
            
            if(bookmarkedWords.length === 0) {
                section.innerHTML = '<div class="glass" style="padding: 40px; text-align:center">Chưa có từ vựng yêu thích nào.</div>';
            } else {
                section.innerHTML = `
                    <div class="vocab-table-container glass">
                        <table class="vocab-table">
                            <thead><tr><th>Hán tự</th><th>Phiên âm</th><th>Nghĩa</th><th>Hành động</th></tr></thead>
                            <tbody>
                                ${bookmarkedWords.map(w => renderVocabRow(w)).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        }

        contentArea.appendChild(section);
    }

    // --- Boot ---
    initStorage();
    setupNavigation();
    updateProgressUI();
    renderView();
});
