const appData = {
    hsk1: {
        vocabulary: [
            { id: 1, hanzi: "我", pinyin: "wǒ", meaning: "tôi, tao, tớ" },
            { id: 2, hanzi: "你", pinyin: "nǐ", meaning: "bạn, mày, cậu" },
            { id: 3, hanzi: "好", pinyin: "hǎo", meaning: "tốt, khỏe, ngon" },
            { id: 4, hanzi: "爱", pinyin: "ài", meaning: "yêu, thích" },
            { id: 5, hanzi: "吃", pinyin: "chī", meaning: "ăn" },
            { id: 6, hanzi: "喝", pinyin: "hē", meaning: "uống" },
            { id: 7, hanzi: "大", pinyin: "dà", meaning: "to, lớn" },
            { id: 8, hanzi: "小", pinyin: "xiǎo", meaning: "nhỏ, bé" },
            { id: 9, hanzi: "猫", pinyin: "māo", meaning: "con mèo" },
            { id: 10, hanzi: "狗", pinyin: "gǒu", meaning: "con chó" },
            { id: 11, hanzi: "不", pinyin: "bù", meaning: "không" },
            { id: 12, hanzi: "是", pinyin: "shì", meaning: "là" },
            { id: 13, hanzi: "人", pinyin: "rén", meaning: "người" },
            { id: 14, hanzi: "很", pinyin: "hěn", meaning: "rất" },
            { id: 15, hanzi: "去", pinyin: "qù", meaning: "đi" },
            { id: 16, hanzi: "来", pinyin: "lái", meaning: "đến" },
            { id: 17, hanzi: "有", pinyin: "yǒu", meaning: "có" },
            { id: 18, hanzi: "在", pinyin: "zài", meaning: "ở, đang" },
            { id: 19, hanzi: "看", pinyin: "kàn", meaning: "nhìn, xem" },
            { id: 20, hanzi: "听", pinyin: "tīng", meaning: "nghe" }
        ],
        grammar: [
            {
                id: 1,
                title: "Đại từ nhân xưng",
                description: "Dùng để chỉ người nói, người nghe hoặc người được nhắc đến. Ngôi thứ ba dùng 他 (anh ấy), 她 (cô ấy), 它 (nó).",
                example: { hanzi: "我是学生。", pinyin: "Wǒ shì xuéshēng.", meaning: "Tôi là học sinh." }
            },
            {
                id: 2,
                title: "Câu hỏi với '吗' (ma)",
                description: "Thêm '吗' vào cuối câu trần thuật để tạo thành câu hỏi Có/Không.",
                example: { hanzi: "你好吗？", pinyin: "Nǐ hǎo ma?", meaning: "Bạn có khỏe không?" }
            },
            {
                id: 3,
                title: "Phủ định với '不' (bù)",
                description: "Đặt '不' trước động từ hoặc tính từ để biểu thị sự phủ định.",
                example: { hanzi: "我不吃。", pinyin: "Wǒ bù chī.", meaning: "Tôi không ăn." }
            },
            {
                id: 4,
                title: "Câu chữ '是' (shì)",
                description: "Dùng để nối chủ ngữ và vị ngữ danh từ, mang ý nghĩa 'A là B'.",
                example: { hanzi: "他是老师。", pinyin: "Tā shì lǎoshī.", meaning: "Anh ấy là giáo viên." }
            },
            {
                id: 5,
                title: "Trạng từ mức độ '很' (hěn)",
                description: "Dùng trước tính từ để chỉ mức độ cao (rất).",
                example: { hanzi: "我很好。", pinyin: "Wǒ hěn hǎo.", meaning: "Tôi rất khỏe." }
            }
        ]
    },
    hsk2: {
        vocabulary: [
            { id: 1, hanzi: "但是", pinyin: "dànshì", meaning: "nhưng mà" },
            { id: 2, hanzi: "因为", pinyin: "yīnwèi", meaning: "bởi vì" },
            { id: 3, hanzi: "所以", pinyin: "suǒyǐ", meaning: "cho nên" },
            { id: 4, hanzi: "错", pinyin: "cuò", meaning: "sai, lỗi" },
            { id: 5, hanzi: "觉得", pinyin: "juéde", meaning: "cảm thấy" },
            { id: 6, hanzi: "比", pinyin: "bǐ", meaning: "so với (so sánh)" },
            { id: 7, hanzi: "可能", pinyin: "kěnéng", meaning: "có thể" },
            { id: 8, hanzi: "希望", pinyin: "xīwàng", meaning: "hy vọng" },
            { id: 9, hanzi: "问题", pinyin: "wèntí", meaning: "vấn đề, câu hỏi" },
            { id: 10, hanzi: "意思", pinyin: "yìsi", meaning: "ý nghĩa" },
            { id: 11, hanzi: "可以", pinyin: "kěyǐ", meaning: "có thể" },
            { id: 12, hanzi: "准备", pinyin: "zhǔnbèi", meaning: "chuẩn bị" },
            { id: 13, hanzi: "最", pinyin: "zuì", meaning: "nhất" },
            { id: 14, hanzi: "知道", pinyin: "zhīdào", meaning: "biết" },
            { id: 15, hanzi: "穿", pinyin: "chuān", meaning: "mặc (quần áo)" }
        ],
        grammar: [
            {
                id: 1,
                title: "Cấu trúc 因为...所以...",
                description: "Dùng để biểu thị quan hệ nguyên nhân - kết quả (bởi vì... cho nên...).",
                example: { hanzi: "因为下雨，所以我不去。", pinyin: "Yīnwèi xiàyǔ, suǒyǐ wǒ bù qù.", meaning: "Bởi vì trời mưa, cho nên tôi không đi." }
            },
            {
                id: 2,
                title: "Câu so sánh với 比 (bǐ)",
                description: "A + 比 + B + tính từ: A tính từ hơn B.",
                example: { hanzi: "哥哥比我高。", pinyin: "Gēge bǐ wǒ gāo.", meaning: "Anh trai cao hơn tôi." }
            },
            {
                id: 3,
                title: "Động từ năng nguyện 可以 (kěyǐ)",
                description: "Biểu thị sự cho phép hoặc khả năng.",
                example: { hanzi: "我可以进来吗？", pinyin: "Wǒ kěyǐ jìnlái ma?", meaning: "Tôi có thể vào không?" }
            },
            {
                id: 4,
                title: "Cấu trúc với 最 (zuì)",
                description: "Biểu thị mức độ cao nhất (nhất).",
                example: { hanzi: "这是最好的。", pinyin: "Zhè shì zuì hǎo de.", meaning: "Đây là cái tốt nhất." }
            }
        ]
    },
    hsk3: {
        vocabulary: [
            { id: 1, hanzi: "虽然", pinyin: "suīrán", meaning: "mặc dù" },
            { id: 2, hanzi: "一直", pinyin: "yīzhí", meaning: "luôn luôn, suốt" },
            { id: 3, hanzi: "而且", pinyin: "érqiě", meaning: "mà còn, hơn nữa" },
            { id: 4, hanzi: "发现", pinyin: "fāxiàn", meaning: "phát hiện" },
            { id: 5, hanzi: "离开", pinyin: "líkāi", meaning: "rời khỏi" },
            { id: 6, hanzi: "需要", pinyin: "xūyào", meaning: "cần thiết" },
            { id: 7, hanzi: "终于", pinyin: "zhōngyú", meaning: "cuối cùng" },
            { id: 8, hanzi: "愿意", pinyin: "yuànyì", meaning: "bằng lòng, muốn" },
            { id: 9, hanzi: "或者", pinyin: "huòzhě", meaning: "hoặc là (trong câu trần thuật)" },
            { id: 10, hanzi: "还是", pinyin: "háishì", meaning: "hay là (trong câu hỏi)" },
            { id: 11, hanzi: "经常", pinyin: "jīngcháng", meaning: "thường xuyên" },
            { id: 12, hanzi: "比如", pinyin: "bǐrú", meaning: "ví dụ như" },
            { id: 13, hanzi: "决定", pinyin: "juédìng", meaning: "quyết định" },
            { id: 14, hanzi: "关心", pinyin: "guānxīn", meaning: "quan tâm" },
            { id: 15, hanzi: "解决", pinyin: "jiějué", meaning: "giải quyết" }
        ],
        grammar: [
            {
                id: 1,
                title: "Cấu trúc 虽然...但是...",
                description: "Dùng để biểu thị quan hệ nhượng bộ (mặc dù... nhưng...).",
                example: { hanzi: "虽然很累，但是很高兴。", pinyin: "Suīrán hěn lèi, dànshì hěn gāoxìng.", meaning: "Mặc dù rất mệt, nhưng rất vui." }
            },
            {
                id: 2,
                title: "Phân biệt 或者 và 还是",
                description: "或者 dùng trong câu kể (hoặc là). 还是 dùng trong câu hỏi (hay là).",
                example: { hanzi: "你喝茶还是喝咖啡？", pinyin: "Nǐ hē chá háishì hē kāfēi?", meaning: "Bạn uống trà hay uống cà phê?" }
            },
            {
                id: 3,
                title: "Cấu trúc 不但...而且...",
                description: "Biểu thị quan hệ tăng tiến (không những... mà còn...).",
                example: { hanzi: "他不但聪明，而且很努力。", pinyin: "Tā bùdàn cōngmíng, érqiě hěn nǔlì.", meaning: "Anh ấy không những thông minh, mà còn rất nỗ lực." }
            }
        ]
    },
    hsk4: {
        vocabulary: [
            { id: 1, hanzi: "不管", pinyin: "bùguǎn", meaning: "cho dù, bất kể" },
            { id: 2, hanzi: "否则", pinyin: "fǒuzé", meaning: "nếu không thì" },
            { id: 3, hanzi: "随着", pinyin: "suízhe", meaning: "cùng với" },
            { id: 4, hanzi: "即使", pinyin: "jíshǐ", meaning: "cho dù, ngay cả khi" },
            { id: 5, hanzi: "由于", pinyin: "yóuyú", meaning: "do, bởi vì" },
            { id: 6, hanzi: "其实", pinyin: "qíshí", meaning: "thực ra" },
            { id: 7, hanzi: "完全", pinyin: "wánquán", meaning: "hoàn toàn" },
            { id: 8, hanzi: "原来", pinyin: "yuánlái", meaning: "vốn dĩ, hóa ra" },
            { id: 9, hanzi: "估计", pinyin: "gūjì", meaning: "đoán, đánh giá" },
            { id: 10, hanzi: "难道", pinyin: "nándào", meaning: "lẽ nào (nhấn mạnh phản vấn)" }
        ],
        grammar: [
            {
                id: 1,
                title: "Cấu trúc 不管...都/也...",
                description: "Cho dù... đều/cũng...",
                example: { hanzi: "不管多累，他都坚持锻炼。", pinyin: "Bùguǎn duō lèi, tā dōu jiānchí duànliàn.", meaning: "Cho dù rất mệt, anh ấy đều kiên trì tập thể dục." }
            },
            {
                id: 2,
                title: "Cấu trúc 即使...也...",
                description: "Ngay cả khi... cũng... (chỉ sự việc giả định).",
                example: { hanzi: "即使下雨，我也要去。", pinyin: "Jíshǐ xiàyǔ, wǒ yě yào qù.", meaning: "Ngay cả khi trời mưa, tôi cũng phải đi." }
            }
        ]
    },
    hsk5: {
        vocabulary: [
            { id: 1, hanzi: "果然", pinyin: "guǒrán", meaning: "quả nhiên" },
            { id: 2, hanzi: "似乎", pinyin: "sìhū", meaning: "dường như" },
            { id: 3, hanzi: "显然", pinyin: "xiǎnrán", meaning: "hiển nhiên" },
            { id: 4, hanzi: "曾经", pinyin: "céngjīng", meaning: "đã từng" },
            { id: 5, hanzi: "到底", pinyin: "dàodǐ", meaning: "rốt cuộc" },
            { id: 6, hanzi: "毕竟", pinyin: "bìjìng", meaning: "suy cho cùng" },
            { id: 7, hanzi: "稍微", pinyin: "shāowēi", meaning: "hơi, một chút" },
            { id: 8, hanzi: "简直", pinyin: "jiǎnzhí", meaning: "quả thực là" },
            { id: 9, hanzi: "难怪", pinyin: "nánguài", meaning: "thảo nào, hèn gì" },
            { id: 10, hanzi: "万一", pinyin: "wànyī", meaning: "nhỡ đâu, ngộ nhỡ" }
        ],
        grammar: [
            {
                id: 1,
                title: "Từ vựng '到底' (rốt cuộc)",
                description: "Dùng trong câu hỏi để nhấn mạnh ý muốn tìm hiểu đến cùng.",
                example: { hanzi: "你到底去不去？", pinyin: "Nǐ dàodǐ qù bú qù?", meaning: "Rốt cuộc bạn có đi không?" }
            },
            {
                id: 2,
                title: "Cấu trúc 难怪...原来...",
                description: "Thảo nào... hóa ra...",
                example: { hanzi: "难怪他没来，原来他生病了。", pinyin: "Nánguài tā méi lái, yuánlái tā shēngbìng le.", meaning: "Thảo nào anh ấy không đến, hóa ra anh ấy bị ốm." }
            }
        ]
    },
    hsk6: {
        vocabulary: [
            { id: 1, hanzi: "哪怕", pinyin: "nǎpà", meaning: "ngay cả khi (giống 即使 nhưng ngữ khí mạnh hơn)" },
            { id: 2, hanzi: "何况", pinyin: "hékuàng", meaning: "huống hồ" },
            { id: 3, hanzi: "与其", pinyin: "yǔqí", meaning: "thà rằng (thường đi với 不如)" },
            { id: 4, hanzi: "宁可", pinyin: "nìngkě", meaning: "thà (thường đi với 也不)" },
            { id: 5, hanzi: "以便", pinyin: "yǐbiàn", meaning: "để, nhằm (thể hiện mục đích)" },
            { id: 6, hanzi: "进而", pinyin: "jìn'ér", meaning: "hơn nữa, tiến tới" },
            { id: 7, hanzi: "总之", pinyin: "zǒngzhī", meaning: "tóm lại" },
            { id: 8, hanzi: "鉴于", pinyin: "jiànyú", meaning: "xét thấy, do" },
            { id: 9, hanzi: "之际", pinyin: "zhījì", meaning: "vào lúc, trong khi" },
            { id: 10, hanzi: "固然", pinyin: "gùrán", meaning: "tuy rằng... nhưng..." }
        ],
        grammar: [
            {
                id: 1,
                title: "Cấu trúc 与其...不如...",
                description: "Thà... còn hơn... (lựa chọn phương án tốt hơn).",
                example: { hanzi: "与其抱怨，不如行动。", pinyin: "Yǔqí bàoyuàn, bùrú xíngdòng.", meaning: "Thà hành động còn hơn là phàn nàn." }
            },
            {
                id: 2,
                title: "Cấu trúc 宁可...也不...",
                description: "Thà (chấp nhận cái xấu)... cũng không (chấp nhận cái tệ hơn).",
                example: { hanzi: "他宁可不吃饭，也不吃药。", pinyin: "Tā nìngkě bù chī fàn, yě bù chī yào.", meaning: "Anh ấy thà không ăn cơm, cũng không uống thuốc." }
            }
        ]
    }
};
