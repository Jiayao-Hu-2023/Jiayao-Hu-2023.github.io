// 语言包
const translations = {
    'zh-CN': {
        'cover-title': '2026 马年大吉',
        'cover-subtitle': '新春快乐 · 万事如意',
        'page2-title': '节日问候',
        'page2-content': '在这辞旧迎新的美好时刻，向您致以最诚挚的节日问候。愿您在新的一年里，事业蒸蒸日上，生活幸福美满，阖家欢乐安康！',
        'page3-title': '新春祝福',
        'page3-content': '马年到，好运来！愿您策马奔腾，事业有成；马到成功，财源广进；龙马精神，健康长寿；一马当先，万事顺意！',
        'page4-title': '感恩有你',
        'page4-content': '感恩一路有您的陪伴与支持，是您的鼓励让我不断前进。新的一年，愿我们继续携手同行，共创美好未来！',
        'page5-title': '温馨祝福',
        'page5-content': '愿新春的钟声带给您吉祥如意，愿新春的气息带给您健康平安，愿新春的祝福带给您幸福快乐，愿您在新的一年里心想事成，万事如意！',
        'page6-title': '胡嘉耀 制作',
        'page6-content': '感谢您的观看，祝您新春快乐，马年大吉！'
    },
    'zh-TW': {
        'cover-title': '2026 馬年大吉',
        'cover-subtitle': '新春快樂 · 萬事如意',
        'page2-title': '節日問候',
        'page2-content': '在這辭舊迎新的美好時刻，向您致以最誠摯的節日問候。願您在新的一年裡，事業蒸蒸日上，生活幸福美滿，闔家歡樂安康！',
        'page3-title': '新春祝福',
        'page3-content': '馬年到，好運來！願您策馬奔騰，事業有成；馬到成功，財源廣進；龍馬精神，健康長壽；一馬當先，萬事順意！',
        'page4-title': '感恩有你',
        'page4-content': '感恩一路有您的陪伴與支持，是您的鼓勵讓我不斷前進。新的一年，願我們繼續攜手同行，共創美好未來！',
        'page5-title': '溫馨祝福',
        'page5-content': '願新春的鐘聲帶給您吉祥如意，願新春的氣息帶給您健康平安，願新春的祝福帶給您幸福快樂，願您在新的一年裡心想事成，萬事如意！',
        'page6-title': '胡嘉耀 製作',
        'page6-content': '感謝您的觀看，祝您新春快樂，馬年大吉！'
    },
    'en-US': {
        'cover-title': '2026 Year of the Horse',
        'cover-subtitle': 'Happy New Year · All the Best',
        'page2-title': 'Holiday Greetings',
        'page2-content': 'In this wonderful moment of bidding farewell to the old and welcoming the new, I extend my most sincere holiday greetings to you. May your career thrive, your life be happy and fulfilling, and your family be joyful and healthy in the new year!',
        'page3-title': 'New Year Wishes',
        'page3-content': 'The Year of the Horse is here, bringing good luck! May you ride the horse to success in your career; may you achieve immediate success and abundant wealth; may you have the vigor of a dragon and horse for a long and healthy life; may you take the lead and have everything go your way!',
        'page4-title': 'Grateful for You',
        'page4-content': 'Grateful for your companionship and support along the way, it is your encouragement that keeps me moving forward. In the new year, may we continue to walk hand in hand and create a better future together!',
        'page5-title': 'Warm Wishes',
        'page5-content': 'May the New Year bell bring you good luck, may the New Year atmosphere bring you health and peace, may the New Year wishes bring you happiness and joy, may all your wishes come true and everything go well in the new year!',
        'page6-title': 'Created by Jiayao Hu',
        'page6-content': 'Thank you for watching, wishing you a happy New Year and a prosperous Year of the Horse!'
    }
};

// 当前语言
let currentLanguage = 'zh-CN';

// 初始化语言
function initLanguage() {
    // 首先尝试从localStorage获取保存的语言
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        // 检测设备语言
        const deviceLanguage = navigator.language || navigator.userLanguage;
        if (deviceLanguage.startsWith('zh-CN') && translations['zh-CN']) {
            currentLanguage = 'zh-CN';
        } else if (deviceLanguage.startsWith('zh-TW') && translations['zh-TW']) {
            currentLanguage = 'zh-TW';
        } else if (deviceLanguage.startsWith('en') && translations['en-US']) {
            currentLanguage = 'en-US';
        }
    }
    
    // 设置语言
    switchLanguage(currentLanguage);
}

// 切换语言
function switchLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // 保存语言到localStorage
    localStorage.setItem('language', lang);
    
    // 更新页面内容
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// 烟花效果
function createFireworks() {
    // 为第一页添加烟花
    const container1 = document.getElementById('fireworks');
    if (container1) {
        setInterval(() => {
            createSingleFirework(container1);
        }, 500);
    }
    
    // 为第六页添加烟花
    const page6 = document.querySelector('.page-6');
    if (page6) {
        // 创建烟花容器
        const container6 = document.createElement('div');
        container6.className = 'fireworks-container';
        container6.id = 'fireworks-page6';
        page6.appendChild(container6);
        
        // 添加烟花效果
        setInterval(() => {
            createSingleFirework(container6);
        }, 300); // 第六页烟花更密集
    }
}

// 创建单个烟花
function createSingleFirework(container) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // 随机位置
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    firework.style.left = `${x}%`;
    firework.style.top = `${y}%`;
    
    // 随机颜色
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead', '#ff8a80', '#81c784', '#64b5f6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    firework.style.backgroundColor = color;
    
    // 随机大小
    const size = Math.random() * 10 + 5;
    firework.style.width = `${size}px`;
    firework.style.height = `${size}px`;
    
    container.appendChild(firework);
    
    // 动画结束后移除
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

// 添加春节装饰元素
function addSpringFestivalDecorations() {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach((page, index) => {
        // 添加灯笼
        for (let i = 0; i < 4; i++) {
            const lantern = document.createElement('div');
            lantern.className = 'decoration';
            lantern.innerHTML = '🏮';
            lantern.style.fontSize = '2rem';
            lantern.style.left = `${Math.random() * 100}%`;
            lantern.style.top = `${Math.random() * 100}%`;
            lantern.style.animationDelay = `${Math.random() * 5}s`;
            lantern.style.animationDuration = `${Math.random() * 10 + 10}s`;
            page.appendChild(lantern);
        }
        
        // 添加红包
        for (let i = 0; i < 3; i++) {
            const redPacket = document.createElement('div');
            redPacket.className = 'decoration';
            redPacket.innerHTML = '🧧';
            redPacket.style.fontSize = '1.5rem';
            redPacket.style.left = `${Math.random() * 100}%`;
            redPacket.style.top = `${Math.random() * 100}%`;
            redPacket.style.animationDelay = `${Math.random() * 5}s`;
            redPacket.style.animationDuration = `${Math.random() * 10 + 10}s`;
            page.appendChild(redPacket);
        }
        
        // 添加马年元素装饰
        for (let i = 0; i < 2; i++) {
            const horse = document.createElement('div');
            horse.className = 'decoration';
            horse.innerHTML = '🐎';
            horse.style.fontSize = '1.5rem';
            horse.style.left = `${Math.random() * 100}%`;
            horse.style.top = `${Math.random() * 100}%`;
            horse.style.animationDelay = `${Math.random() * 10 + 5}s`;
            horse.style.animationDuration = `${Math.random() * 15 + 15}s`;
            page.appendChild(horse);
        }
        
        // 添加春节花朵装饰
        for (let i = 0; i < 3; i++) {
            const flower = document.createElement('div');
            flower.className = 'decoration';
            flower.innerHTML = '🌸';
            flower.style.fontSize = '1rem';
            flower.style.left = `${Math.random() * 100}%`;
            flower.style.top = `${Math.random() * 100}%`;
            flower.style.animationDelay = `${Math.random() * 8 + 2}s`;
            flower.style.animationDuration = `${Math.random() * 12 + 12}s`;
            page.appendChild(flower);
        }
        
        // 根据页面索引添加不同的春节元素
        switch (index) {
            case 0: // 第一页：封面
                // 添加春联
                addCouplets(page);
                // 添加福字
                addFu(page);
                break;
            case 1: // 第二页：节日问候
                // 添加包饺子
                addDumplings(page);
                // 添加书法
                addCalligraphy(page, '春节快乐');
                break;
            case 2: // 第三页：祝福语
                // 添加福字
                addFu(page);
                // 添加书法
                addCalligraphy(page, '马年大吉');
                break;
            case 3: // 第四页：感恩有你
                // 添加包饺子
                addDumplings(page);
                // 添加书法
                addCalligraphy(page, '感恩有你');
                break;
            case 4: // 第五页：温馨祝福
                // 添加春联
                addCouplets(page);
                // 添加书法
                addCalligraphy(page, '万事如意');
                break;
            case 5: // 第六页：制作信息
                // 添加福字
                addFu(page);
                // 添加书法
                addCalligraphy(page, '新春快乐');
                break;
        }
    });
}

// 添加春联
function addCouplets(page) {
    // 左边春联
    const coupletLeft = document.createElement('div');
    coupletLeft.className = 'couplet couplet-left';
    coupletLeft.textContent = '新春大吉鸿运到\n马年如意福临门';
    page.appendChild(coupletLeft);
    
    // 右边春联
    const coupletRight = document.createElement('div');
    coupletRight.className = 'couplet couplet-right';
    coupletRight.textContent = '一帆风顺年年好\n万事如意步步高';
    page.appendChild(coupletRight);
}

// 添加福字
function addFu(page) {
    const fu = document.createElement('div');
    fu.className = 'fu';
    fu.innerHTML = '福';
    fu.style.top = `${Math.random() * 30 + 10}%`;
    fu.style.right = `${Math.random() * 20 + 5}%`;
    fu.style.animationDelay = `${Math.random() * 5}s`;
    page.appendChild(fu);
    
    // 添加多个小福字
    for (let i = 0; i < 3; i++) {
        const smallFu = document.createElement('div');
        smallFu.className = 'fu';
        smallFu.innerHTML = '福';
        smallFu.style.fontSize = '1.5rem';
        smallFu.style.left = `${Math.random() * 100}%`;
        smallFu.style.top = `${Math.random() * 100}%`;
        smallFu.style.animationDelay = `${Math.random() * 10 + 5}s`;
        smallFu.style.animationDuration = `${Math.random() * 10 + 15}s`;
        page.appendChild(smallFu);
    }
}

// 添加包饺子
function addDumplings(page) {
    for (let i = 0; i < 5; i++) {
        const dumpling = document.createElement('div');
        dumpling.className = 'dumpling';
        dumpling.innerHTML = '🥟';
        dumpling.style.left = `${Math.random() * 100}%`;
        dumpling.style.top = `${Math.random() * 100}%`;
        dumpling.style.animationDelay = `${Math.random() * 3}s`;
        dumpling.style.animationDuration = `${Math.random() * 2 + 2}s`;
        page.appendChild(dumpling);
    }
}

// 添加书法
function addCalligraphy(page, text) {
    const calligraphy = document.createElement('div');
    calligraphy.className = 'calligraphy';
    calligraphy.textContent = text;
    calligraphy.style.left = `${Math.random() * 60 + 20}%`;
    calligraphy.style.top = `${Math.random() * 60 + 20}%`;
    calligraphy.style.animationDelay = `${Math.random() * 5}s`;
    page.appendChild(calligraphy);
}

// 增强滑动翻页体验
function enhanceScrollExperience() {
    const container = document.querySelector('.page-container');
    
    // 禁止水平滚动
    container.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
        }
    });
    
    // 禁止触摸设备的水平滑动
    let startX, startY;
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const diffX = Math.abs(currentX - startX);
        const diffY = Math.abs(currentY - startY);
        
        if (diffX > diffY) {
            e.preventDefault();
        }
        
        startX = null;
        startY = null;
    });
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    // 初始化语言（检测设备语言并从localStorage恢复）
    initLanguage();
    
    // 创建烟花效果
    createFireworks();
    
    // 添加春节装饰
    addSpringFestivalDecorations();
    
    // 增强滑动体验
    enhanceScrollExperience();
});

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(2);
            opacity: 0.8;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);