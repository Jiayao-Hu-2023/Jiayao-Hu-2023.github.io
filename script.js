// 全局变量
let attemptCount = 0;
let startTime = null;
let isChasing = false;
let currentPhase = 1;

// DOM元素
const ageButton = document.getElementById('ageButton');
const attemptCounter = document.getElementById('attemptCounter');
const attemptCountSpan = document.getElementById('attemptCount');
const exitButton = document.getElementById('exitButton');
const dialog = document.getElementById('dialog');
const dialogText = document.getElementById('dialogText');
const dialogConfirm = document.getElementById('dialogConfirm');
const surrenderPage = document.getElementById('surrenderPage');
const chaseTimeSpan = document.getElementById('chaseTime');
const finalAttemptsSpan = document.getElementById('finalAttempts');
const resetButton = document.getElementById('resetButton');

// 按钮文案库
const buttonTexts = {
    phase1: ["我已满18岁，进入", "确认并继续"],
    phase2: ["再试一次？", "你确定满18了？", "年龄验证中..."],
    phase3: ["追不上我吧~", "成年人要学会放弃", "要不你点'退出'算了？", "来呀，追我呀！"],
    phase4: ["等等，我们聊聊", "停！有话好说", "先别急着点"],
    phase5: ["行吧，你赢了", "我投降", "你太执着了"]
};

// 对话框内容
const dialogMessages = [
    "你为什么非要点击我？是因为这页只有我一个按钮吗？",
    "说实话，有点感动，但今天真的不行。",
    "你知道吗？你是我见过最有耐心的用户。",
    "要不我们做个交易？你点退出，我告诉你秘密。",
    "好吧，我承认，你追得我有点累了..."
];

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    startTime = Date.now();
    
    // 按钮鼠标悬停事件 - 只移动不计数
    ageButton.addEventListener('mouseenter', handleButtonHover);
    ageButton.addEventListener('touchstart', handleButtonTouch, { passive: false });
    
    // 按钮点击事件 - 实际点击才计数
    ageButton.addEventListener('click', handleButtonClick);
    
    // 退出按钮事件
    exitButton.addEventListener('click', handleExitClick);
    
    // 重置按钮事件
    resetButton.addEventListener('click', resetGame);
    
    // 对话框确认按钮事件
    dialogConfirm.addEventListener('click', function() {
        dialog.classList.add('hidden');
    });
});

// 处理按钮悬停（鼠标）- 只移动不计数
function handleButtonHover(event) {
    if (isChasing) return;
    
    isChasing = true;
    document.body.classList.add('chasing');
    
    // 执行移动动作（不计数）
    moveButtonRandomly(event);
    
    // 短暂延迟后重置追逐状态
    setTimeout(() => {
        isChasing = false;
        document.body.classList.remove('chasing');
    }, 300);
}

// 处理按钮触摸（移动端）- 只移动不计数
function handleButtonTouch(event) {
    event.preventDefault();
    if (isChasing) return;
    
    isChasing = true;
    
    // 执行移动动作（不计数）
    moveButtonRandomly(event);
    
    setTimeout(() => {
        isChasing = false;
    }, 300);
}

// 处理按钮点击 - 实际点击才计数
function handleButtonClick(event) {
    event.preventDefault();
    
    // 增加尝试次数
    attemptCount++;
    attemptCountSpan.textContent = attemptCount;
    
    // 根据尝试次数确定阶段
    determinePhase();
    
    // 只有在阶段5（投降）时才允许点击
    if (currentPhase === 5) {
        triggerSurrender();
    } else {
        // 其他阶段点击时显示提示
        const messages = ["追不上我吧~", "再来呀！", "差一点！", "好险！", "哈哈！"];
        showTemporaryMessage(messages[Math.floor(Math.random() * messages.length)]);
        
        // 点击后立即移动按钮到随机位置
        moveButtonToRandomPosition(event);
    }
}

// 处理退出按钮点击
function handleExitClick(event) {
    event.preventDefault();
    
    if (attemptCount === 0) {
        // 第一次点击退出
        showDialog("这么快就要走？里面可是有'精彩内容'的哦~");
    } else if (attemptCount < 5) {
        // 中途点击退出
        showDialog("想逃？按钮都比你勇敢。再试试看？");
    } else {
        // 多次尝试后点击退出
        showDialog("退出按钮都被你点了，看来你是真的不想看。好吧，其实也没什么秘密。");
        setTimeout(() => {
            triggerSurrender();
        }, 3000);
    }
}

// 确定当前阶段
function determinePhase() {
    if (attemptCount <= 2) {
        currentPhase = 1;
    } else if (attemptCount <= 5) {
        currentPhase = 2;
    } else if (attemptCount <= 9) {
        currentPhase = 3;
    } else if (attemptCount <= 12) {
        currentPhase = 4;
    } else {
        currentPhase = 5;
    }
}

// 执行阶段对应的动作
function executePhaseAction(event) {
    const buttonRect = ageButton.getBoundingClientRect();
    const containerRect = document.querySelector('.button-container').getBoundingClientRect();
    
    switch (currentPhase) {
        case 1: // 阶段1：轻微闪躲
            phase1Action(event, buttonRect, containerRect);
            break;
        case 2: // 阶段2：明显跳跃
            phase2Action(event, buttonRect, containerRect);
            break;
        case 3: // 阶段3：复杂移动
            phase3Action(event, buttonRect, containerRect);
            break;
        case 4: // 阶段4：谈判时刻
            phase4Action(event, buttonRect, containerRect);
            break;
        case 5: // 阶段5：最终投降
            phase5Action();
            break;
    }
    
    // 更新按钮文案
    updateButtonText();
}

// 阶段1动作：轻微闪躲
function phase1Action(event, buttonRect, containerRect) {
    ageButton.classList.add('shake');
    setTimeout(() => ageButton.classList.remove('shake'), 300);
}

// 阶段2动作：明显跳跃
function phase2Action(event, buttonRect, containerRect) {
    ageButton.classList.add('jump');
    setTimeout(() => ageButton.classList.remove('jump'), 200);
}

// 阶段3动作：复杂移动
function phase3Action(event, buttonRect, containerRect) {
    executeRandomMove();
}

// 阶段4动作：谈判时刻
function phase4Action(event, buttonRect, containerRect) {
    if (attemptCount === 8) {
        // 第一次进入阶段4时显示对话框
        setTimeout(() => {
            showDialog(dialogMessages[Math.floor(Math.random() * dialogMessages.length)]);
        }, 300);
    }
    
    ageButton.classList.add('talk');
    setTimeout(() => ageButton.classList.remove('talk'), 400);
}

// 阶段5动作：最终投降
function phase5Action() {
    ageButton.classList.add('surrender');
    setTimeout(() => {
        triggerSurrender();
    }, 600);
}

// 移动按钮到随机位置（点击时调用）
function moveButtonToRandomPosition(event) {
    if (isChasing) return;
    
    isChasing = true;
    
    // 获取按钮容器尺寸
    const containerRect = document.querySelector('.button-container').getBoundingClientRect();
    const buttonRect = ageButton.getBoundingClientRect();
    
    // 限制移动范围在按钮容器内
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    
    // 计算可移动范围（确保按钮在容器内）
    const maxX = (containerWidth - buttonWidth) / 2;
    const maxY = (containerHeight - buttonHeight) / 2;
    
    // 生成随机位置（在容器范围内）
    const randomX = Math.random() * maxX * 2 - maxX;
    const randomY = Math.random() * maxY * 2 - maxY;
    
    // 随机大小变化（0.8倍到1.2倍）
    const randomScale = 0.8 + Math.random() * 0.4;
    
    // 随机字体大小变化（14px到20px）
    const randomFontSize = 14 + Math.random() * 6;
    
    // 应用随机变换
    ageButton.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
    ageButton.style.fontSize = `${randomFontSize}px`;
    ageButton.style.position = 'absolute';
    ageButton.style.left = '50%';
    ageButton.style.top = '0';
    ageButton.style.zIndex = '10';
    
    // 添加平滑过渡
    ageButton.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // 更新按钮文案
    updateButtonText();
    
    setTimeout(() => {
        isChasing = false;
    }, 300);
}

// 随机移动按钮（悬停时调用）
function moveButtonRandomly(event) {
    if (isChasing) return;
    
    isChasing = true;
    
    const buttonRect = ageButton.getBoundingClientRect();
    const containerRect = document.querySelector('.button-container').getBoundingClientRect();
    
    // 根据阶段决定移动幅度（限制在容器范围内）
    let moveDistance;
    if (attemptCount <= 2) moveDistance = 30;
    else if (attemptCount <= 4) moveDistance = 60;
    else if (attemptCount <= 7) moveDistance = 90;
    else moveDistance = 120;
    
    // 限制移动距离不超过容器范围
    const containerWidth = containerRect.width;
    const buttonWidth = buttonRect.width;
    const maxAllowedDistance = (containerWidth - buttonWidth) / 2 - 10;
    moveDistance = Math.min(moveDistance, maxAllowedDistance);
    
    const newX = getRandomPosition(buttonRect, containerRect, moveDistance);
    const newY = Math.random() > 0.5 ? moveDistance/3 : -moveDistance/3;
    
    ageButton.style.setProperty('--runaway-x', newX + 'px');
    ageButton.style.setProperty('--runaway-y', newY + 'px');
    ageButton.classList.add('runaway');
    
    setTimeout(() => {
        ageButton.classList.remove('runaway');
        isChasing = false;
    }, 250);
}

// 获取随机位置
function getRandomPosition(buttonRect, containerRect, maxDistance) {
    const containerWidth = containerRect.width;
    const buttonWidth = buttonRect.width;
    const maxX = (containerWidth - buttonWidth) / 2;
    
    // 确保移动幅度足够大
    const sign = Math.random() > 0.5 ? 1 : -1;
    const newX = sign * (maxX * 0.8); // 使用80%的最大范围
    
    return newX;
}

// 更新按钮文案
function updateButtonText() {
    const texts = buttonTexts['phase' + currentPhase];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    ageButton.textContent = randomText;
}

// 显示对话框
function showDialog(message) {
    dialogText.textContent = message;
    dialog.classList.remove('hidden');
}

// 显示临时消息
function showTemporaryMessage(message) {
    const tempMsg = document.createElement('div');
    tempMsg.textContent = message;
    
    // 获取按钮当前位置
    const buttonRect = ageButton.getBoundingClientRect();
    
    // 计算消息位置（按钮上方）
    const messageTop = buttonRect.top - 40;
    const messageLeft = buttonRect.left + buttonRect.width / 2;
    
    // 设置消息位置
    tempMsg.style.cssText = `
        position: fixed;
        top: ${messageTop}px;
        left: ${messageLeft}px;
        transform: translateX(-50%);
        background: rgba(60, 60, 60, 0.95);
        color: #ccc;
        padding: 8px 16px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        font-size: 13px;
        font-weight: 500;
        z-index: 1000;
        white-space: nowrap;
        animation: messageFade 2s ease-in-out;
    `;
    
    document.body.appendChild(tempMsg);
    
    setTimeout(() => {
        if (document.body.contains(tempMsg)) {
            document.body.removeChild(tempMsg);
        }
    }, 2000);
}

// 触发投降页面
function triggerSurrender() {
    const chaseTime = Math.floor((Date.now() - startTime) / 1000);
    chaseTimeSpan.textContent = chaseTime;
    finalAttemptsSpan.textContent = attemptCount;
    
    surrenderPage.classList.remove('hidden');
    setTimeout(() => {
        surrenderPage.classList.add('visible');
    }, 100);
}

// 重置游戏
function resetGame() {
    attemptCount = 0;
    currentPhase = 1;
    startTime = Date.now();
    
    // 重置UI
    attemptCountSpan.textContent = '0';
    attemptCounter.classList.remove('visible');
    ageButton.textContent = '我已满18岁，进入';
    ageButton.classList.remove('surrender');
    
    // 隐藏投降页面
    surrenderPage.classList.remove('visible');
    setTimeout(() => {
        surrenderPage.classList.add('hidden');
    }, 500);
    
    // 重置按钮位置和样式
    ageButton.style.transform = 'translateX(-50%)';
    ageButton.style.fontSize = '18px';
    ageButton.style.padding = '15px 30px';
    
    // 移除所有CSS变量
    ageButton.style.removeProperty('--random-x');
    ageButton.style.removeProperty('--random-y');
    ageButton.style.removeProperty('--random-scale');
    ageButton.style.removeProperty('--random-rotate');
    ageButton.style.removeProperty('--random-font-size');
    ageButton.style.removeProperty('--random-padding-vertical');
    ageButton.style.removeProperty('--random-padding-horizontal');
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(style);