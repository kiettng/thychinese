document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const levelSelector = document.getElementById('level-selector');
    const navItems = document.querySelectorAll('.nav-item');
    const contentArea = document.getElementById('content-area');
    const pageTitle = document.getElementById('page-title');

    // State
    let currentLevel = 'hsk1';
    let currentView = 'dashboard';
    
    // Initialize
    renderView();

    // Event Listeners
    levelSelector.addEventListener('change', (e) => {
        currentLevel = e.target.value;
        renderView();
    });

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update view
            currentView = item.getAttribute('data-view');
            
            // Update Title
            pageTitle.innerText = item.innerText.trim();
            
            renderView();
        });
    });

    // Rendering Logic
    function renderView() {
        const data = appData[currentLevel];
        contentArea.innerHTML = ''; // Clear current content
        
        const section = document.createElement('div');
        section.className = 'view-section';

        if (currentView === 'dashboard') {
            section.innerHTML = `
                <div class="dashboard-grid">
                    <div class="stat-card glass">
                        <div class="stat-icon"><i class="fa-solid fa-layer-group"></i></div>
                        <h3>Cấp độ hiện tại</h3>
                        <p>${currentLevel.toUpperCase()}</p>
                    </div>
                    <div class="stat-card glass" onclick="document.querySelector('[data-view=\\'vocabulary\\']').click()">
                        <div class="stat-icon"><i class="fa-solid fa-book-open"></i></div>
                        <h3>Từ vựng</h3>
                        <p>${data.vocabulary.length}</p>
                    </div>
                    <div class="stat-card glass" onclick="document.querySelector('[data-view=\\'grammar\\']').click()">
                        <div class="stat-icon"><i class="fa-solid fa-pen-nib"></i></div>
                        <h3>Ngữ pháp</h3>
                        <p>${data.grammar.length}</p>
                    </div>
                </div>
            `;
        } 
        else if (currentView === 'vocabulary') {
            if(data.vocabulary.length === 0) {
                section.innerHTML = '<p>Chưa có dữ liệu từ vựng cho cấp độ này.</p>';
            } else {
                // Render Flashcards (we'll just show the first one as an example, with next/prev buttons)
                let currentIndex = 0;
                
                const renderFlashcard = (index) => {
                    const word = data.vocabulary[index];
                    return `
                        <div class="flashcard-container">
                            <div class="flashcard glass" id="flashcard" onclick="this.classList.toggle('flipped')">
                                <div class="flashcard-inner">
                                    <div class="flashcard-front">
                                        <div class="hanzi">${word.hanzi}</div>
                                        <div class="pinyin">${word.pinyin}</div>
                                        <p class="text-muted" style="font-size: 12px; margin-top: 10px;">Chạm để lật</p>
                                    </div>
                                    <div class="flashcard-back">
                                        <div class="meaning">${word.meaning}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-controls">
                                <button class="btn btn-secondary" id="btn-prev" ${index === 0 ? 'disabled' : ''}>
                                    <i class="fa-solid fa-chevron-left"></i> Trước
                                </button>
                                <span style="line-height: 44px; font-weight: 600; color: var(--primary-dark)">
                                    ${index + 1} / ${data.vocabulary.length}
                                </span>
                                <button class="btn btn-primary" id="btn-next" ${index === data.vocabulary.length - 1 ? 'disabled' : ''}>
                                    Tiếp <i class="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    `;
                };

                section.innerHTML = renderFlashcard(currentIndex);
                
                // Add event listeners after attaching to DOM
                setTimeout(() => {
                    attachFlashcardListeners(currentIndex, data.vocabulary, renderFlashcard, section);
                }, 0);
            }
        }
        else if (currentView === 'grammar') {
            if(data.grammar.length === 0) {
                section.innerHTML = '<p>Chưa có dữ liệu ngữ pháp cho cấp độ này.</p>';
            } else {
                let html = '<div class="grammar-list">';
                data.grammar.forEach(item => {
                    html += `
                        <div class="grammar-item glass">
                            <h3 class="grammar-title">${item.title}</h3>
                            <p class="grammar-desc">${item.description}</p>
                            <div class="grammar-example">
                                <div class="ex-hanzi">${item.example.hanzi}</div>
                                <div class="ex-pinyin">${item.example.pinyin}</div>
                                <div class="ex-meaning">${item.example.meaning}</div>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';
                section.innerHTML = html;
            }
        }

        contentArea.appendChild(section);
    }

    function attachFlashcardListeners(currentIndex, vocabList, renderFunc, section) {
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        
        if(btnPrev) {
            btnPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                if(currentIndex > 0) {
                    currentIndex--;
                    section.innerHTML = renderFunc(currentIndex);
                    attachFlashcardListeners(currentIndex, vocabList, renderFunc, section);
                }
            });
        }
        
        if(btnNext) {
            btnNext.addEventListener('click', (e) => {
                e.stopPropagation();
                if(currentIndex < vocabList.length - 1) {
                    currentIndex++;
                    section.innerHTML = renderFunc(currentIndex);
                    attachFlashcardListeners(currentIndex, vocabList, renderFunc, section);
                }
            });
        }
    }
});
