const gameState = {
    asset: 20,
    selectedRedBalls: [],
    selectedBlueBalls: [],
    multiplier: 1,
    winningRedBalls: [],
    winningBlueBall: null,
    gamePhase: 'selecting'
};

const PRIZES = {
    1: { id: '1', name: '一等奖', amount: 5000000, match: { red: 6, blue: 1 } },
    2: { id: '2', name: '二等奖', amount: 1000000, match: { red: 6, blue: 0 } },
    3: { id: '3', name: '三等奖', amount: 3000, match: { red: 5, blue: 1 } },
    4: { id: '4', name: '四等奖', amount: 200, match: { red: 5, blue: 0 } },
    5: { id: '5', name: '五等奖', amount: 10, match: { red: 4, blue: 1 } },
    6: { id: '6', name: '六等奖', amount: 5, match: { red: 4, blue: 0 } },
    7: { id: '7', name: '六等奖', amount: 5, match: { red: 3, blue: 1 } },
    8: { id: '8', name: '六等奖', amount: 5, match: { red: 2, blue: 1 } },
    9: { id: '9', name: '六等奖', amount: 5, match: { red: 1, blue: 1 } },
    10: { id: '10', name: '六等奖', amount: 5, match: { red: 0, blue: 1 } }
};

function initGame() {
    gameState.asset = 20;
    gameState.selectedRedBalls = [];
    gameState.selectedBlueBalls = [];
    gameState.multiplier = 1;
    gameState.winningRedBalls = [];
    gameState.winningBlueBall = null;
    gameState.gamePhase = 'selecting';
    
    renderAsset();
    renderBalls();
    updatePreview();
    updateMultiplier();
    calculateNotes();
}

function renderBalls() {
    const redBallsContainer = document.getElementById('redBalls');
    const blueBallsContainer = document.getElementById('blueBalls');
    
    redBallsContainer.innerHTML = '';
    for (let i = 1; i <= 33; i++) {
        const ball = createBall(i, 'red');
        redBallsContainer.appendChild(ball);
    }
    
    blueBallsContainer.innerHTML = '';
    for (let i = 1; i <= 16; i++) {
        const ball = createBall(i, 'blue');
        blueBallsContainer.appendChild(ball);
    }
}

function createBall(num, color) {
    const ball = document.createElement('div');
    ball.className = `ball ball-${color}`;
    ball.textContent = num;
    ball.dataset.num = num;
    ball.dataset.color = color;
    
    ball.addEventListener('click', () => toggleBall(num, color));
    
    return ball;
}

function toggleBall(num, color) {
    if (gameState.gamePhase !== 'selecting') return;
    
    const balls = gameState[color === 'red' ? 'selectedRedBalls' : 'selectedBlueBalls'];
    const maxCount = color === 'red' ? 20 : 16;
    
    const index = balls.indexOf(num);
    if (index > -1) {
        balls.splice(index, 1);
    } else {
        if (balls.length < maxCount) {
            balls.push(num);
            balls.sort((a, b) => a - b);
        }
    }
    
    updateBallUI(num, color);
    updatePreview();
    calculateNotes();
}

function updateBallUI(num, color) {
    const balls = document.querySelectorAll(`.ball-${color}`);
    balls.forEach(ball => {
        if (parseInt(ball.dataset.num) === num) {
            const isSelected = gameState[color === 'red' ? 'selectedRedBalls' : 'selectedBlueBalls'].includes(num);
            ball.classList.toggle('selected', isSelected);
        }
    });
    
    const countEl = document.getElementById(color === 'red' ? 'redCount' : 'blueCount');
    const count = gameState[color === 'red' ? 'selectedRedBalls' : 'selectedBlueBalls'].length;
    countEl.textContent = count;
}

function updatePreview() {
    const redPreview = document.getElementById('previewRedBalls');
    const bluePreview = document.getElementById('previewBlueBalls');
    
    redPreview.innerHTML = '';
    gameState.selectedRedBalls.forEach(num => {
        const ball = document.createElement('div');
        ball.className = 'ball ball-red';
        ball.textContent = num;
        redPreview.appendChild(ball);
    });
    
    bluePreview.innerHTML = '';
    gameState.selectedBlueBalls.forEach(num => {
        const ball = document.createElement('div');
        ball.className = 'ball ball-blue';
        ball.textContent = num;
        bluePreview.appendChild(ball);
    });
}

function updateMultiplier() {
    document.getElementById('multiValue').textContent = gameState.multiplier;
}

function combination(n, m) {
    if (m > n) return 0;
    if (m === 0 || m === n) return 1;
    m = Math.min(m, n - m);
    let result = 1;
    for (let i = 0; i < m; i++) {
        result = result * (n - i) / (i + 1);
    }
    return Math.round(result);
}

function calculateNotes() {
    const redCount = gameState.selectedRedBalls.length;
    const blueCount = gameState.selectedBlueBalls.length;
    
    const redCombinations = redCount >= 6 ? combination(redCount, 6) : 0;
    const notes = redCombinations * blueCount;
    const totalCost = notes * 2 * gameState.multiplier;
    
    document.getElementById('noteCount').textContent = notes;
    document.getElementById('totalCost').textContent = totalCost;
    
    const orderBtn = document.getElementById('orderBtn');
    const canOrder = notes > 0 && totalCost <= gameState.asset;
    orderBtn.disabled = !canOrder;
}

function randomSelect() {
    if (gameState.gamePhase !== 'selecting') return;
    
    const redCount = gameState.selectedRedBalls.length || 6;
    const blueCount = gameState.selectedBlueBalls.length || 1;
    
    gameState.selectedRedBalls = [];
    while (gameState.selectedRedBalls.length < redCount) {
        const num = Math.floor(Math.random() * 33) + 1;
        if (!gameState.selectedRedBalls.includes(num)) {
            gameState.selectedRedBalls.push(num);
        }
    }
    gameState.selectedRedBalls.sort((a, b) => a - b);
    
    gameState.selectedBlueBalls = [];
    while (gameState.selectedBlueBalls.length < blueCount) {
        const num = Math.floor(Math.random() * 16) + 1;
        if (!gameState.selectedBlueBalls.includes(num)) {
            gameState.selectedBlueBalls.push(num);
        }
    }
    gameState.selectedBlueBalls.sort((a, b) => a - b);
    
    document.querySelectorAll('.ball').forEach(ball => ball.classList.remove('selected'));
    gameState.selectedRedBalls.forEach(num => updateBallUI(num, 'red'));
    gameState.selectedBlueBalls.forEach(num => updateBallUI(num, 'blue'));
    
    updatePreview();
    calculateNotes();
}

function clearSelection() {
    if (gameState.gamePhase !== 'selecting') return;
    
    gameState.selectedRedBalls = [];
    gameState.selectedBlueBalls = [];
    
    document.querySelectorAll('.ball').forEach(ball => ball.classList.remove('selected'));
    document.getElementById('redCount').textContent = '0';
    document.getElementById('blueCount').textContent = '0';
    
    updatePreview();
    calculateNotes();
}

function generateOrder() {
    const notes = parseInt(document.getElementById('noteCount').textContent);
    const totalCost = parseInt(document.getElementById('totalCost').textContent);
    
    if (totalCost > gameState.asset) {
        const title = I18N.getTranslation('warning.title');
        const message = I18N.getTranslation('warning.message', { cost: totalCost });
        showWarning(title, message);
        return;
    }
    
    showOrderModal(notes, totalCost);
}

function showWarning(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = `<span class="warning-text">${message}</span>`;
    const confirmText = I18N.getTranslation('modal.confirm');
    document.getElementById('modalFooter').innerHTML = `<button class="btn btn-primary" onclick="closeModal()">${confirmText}</button>`;
    document.getElementById('modalOverlay').style.display = 'flex';
}

function showOrderModal(notes, totalCost) {
    const title = I18N.getTranslation('order.title');
    const redLabel = I18N.getTranslation('order.red');
    const blueLabel = I18N.getTranslation('order.blue');
    const multiplierLabel = I18N.getTranslation('order.multiplier');
    const notesLabel = I18N.getTranslation('order.notes');
    const costLabel = I18N.getTranslation('order.cost');
    const unit = I18N.getTranslation('header.asset.unit');
    const cancelText = I18N.getTranslation('modal.cancel');
    const confirmText = I18N.getTranslation('order.confirm');
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <p style="margin-bottom: 10px;">${redLabel} ${gameState.selectedRedBalls.join(', ')}</p>
            <p style="margin-bottom: 10px;">${blueLabel} ${gameState.selectedBlueBalls.join(', ')}</p>
            <p style="margin-bottom: 10px;">${multiplierLabel} ${gameState.multiplier}</p>
            <p style="margin-bottom: 10px;">${notesLabel} ${notes}</p>
            <p style="font-size: 20px; color: #ff2a6d;">${costLabel} ${totalCost} ${unit}</p>
        </div>
    `;
    document.getElementById('modalFooter').innerHTML = `
        <button class="btn btn-clear" onclick="closeModal()">${cancelText}</button>
        <button class="btn btn-primary" onclick="confirmBet(${totalCost})">${confirmText}</button>
    `;
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

function confirmBet(cost) {
    closeModal();
    gameState.asset -= cost;
    renderAsset();
    gameState.gamePhase = 'drawing';
    
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('drawArea').style.display = 'block';
    
    startDraw();
}

function startDraw() {
    gameState.winningRedBalls = [];
    gameState.winningBlueBall = null;
    
    const allRedBalls = [];
    for (let i = 1; i <= 33; i++) allRedBalls.push(i);
    
    const allBlueBalls = [];
    for (let i = 1; i <= 16; i++) allBlueBalls.push(i);
    
    initDrawMachine('red', allRedBalls);
    
    let ballIndex = 0;
    const drawInterval = setInterval(() => {
        if (ballIndex < 6) {
            drawRedBall(allRedBalls, ballIndex + 1);
            ballIndex++;
            
            if (ballIndex === 6) {
                clearInterval(drawInterval);
                setTimeout(() => {
                    initDrawMachine('blue', allBlueBalls);
                    setTimeout(() => {
                        drawBlueBall(allBlueBalls);
                    }, 2000);
                }, 2000);
            }
        }
    }, 10000);
}

function initDrawMachine(color, balls) {
    const container = document.getElementById(color === 'red' ? 'redMachineBalls' : 'blueMachineBalls');
    container.innerHTML = '';
    
    balls.forEach(num => {
        const ball = document.createElement('div');
        ball.className = `ball ball-${color}`;
        ball.textContent = num;
        ball.style.position = 'absolute';
        ball.style.width = '30px';
        ball.style.height = '30px';
        ball.style.fontSize = '12px';
        ball.style.left = `${Math.random() * 140 + 15}px`;
        ball.style.top = `${Math.random() * 180 + 15}px`;
        container.appendChild(ball);
    });
    
    animateMachine(color, true);
}

function animateMachine(color, active) {
    const container = document.getElementById(color === 'red' ? 'redMachineBalls' : 'blueMachineBalls');
    const balls = container.querySelectorAll('.ball');
    
    if (active) {
        balls.forEach((ball, index) => {
            animateBall(ball, index);
        });
    } else {
        balls.forEach(ball => {
            ball.style.animation = 'none';
        });
    }
}

function animateBall(ball, index) {
    const duration = 0.5 + Math.random() * 0.5;
    const delay = index * 0.1;
    
    ball.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    
    ball.style.setProperty('--x', `${(Math.random() - 0.5) * 60}px`);
    ball.style.setProperty('--y', `${(Math.random() - 0.5) * 80}px`);
}

function drawRedBall(allRedBalls, ballNumber) {
    const index = Math.floor(Math.random() * allRedBalls.length);
    const drawnBall = allRedBalls.splice(index, 1)[0];
    gameState.winningRedBalls.push(drawnBall);
    
    const container = document.getElementById('redMachineBalls');
    const balls = container.querySelectorAll('.ball');
    balls.forEach(ball => {
        if (parseInt(ball.textContent) === drawnBall) {
            ball.style.animation = 'none';
            ball.style.transform = 'translateY(200px)';
            ball.style.opacity = '0';
            
            setTimeout(() => {
                ball.remove();
                addDrawnBall('red', drawnBall, ballNumber);
            }, 1000);
        }
    });
    
    updateProgress(ballNumber, 6);
}

function drawBlueBall(allBlueBalls) {
    const index = Math.floor(Math.random() * allBlueBalls.length);
    gameState.winningBlueBall = allBlueBalls[index];
    
    const container = document.getElementById('blueMachineBalls');
    const balls = container.querySelectorAll('.ball');
    balls.forEach(ball => {
        if (parseInt(ball.textContent) === gameState.winningBlueBall) {
            ball.style.animation = 'none';
            ball.style.transform = 'translateY(200px)';
            ball.style.opacity = '0';
            
            setTimeout(() => {
                ball.remove();
                addDrawnBall('blue', gameState.winningBlueBall, 1);
            }, 1000);
        }
    });
    
    setTimeout(() => {
        checkPrize();
    }, 2000);
}

function addDrawnBall(color, num, position) {
    const container = document.getElementById(color === 'red' ? 'drawnRedBalls' : 'drawnBlueBall');
    const ball = document.createElement('div');
    ball.className = `ball ball-${color}`;
    ball.textContent = num;
    ball.style.animation = 'ball-reveal 0.5s ease';
    container.appendChild(ball);
}

function updateProgress(current, total) {
    const progress = (current / total) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    if (current < total) {
        const text = I18N.getTranslation('draw.progress.red', { current, total, time: 10 });
        document.getElementById('progressText').textContent = text;
    } else {
        const text = I18N.getTranslation('draw.progress.blue');
        document.getElementById('progressText').textContent = text;
    }
}

function checkPrize() {
    let totalPrize = 0;
    let totalWins = 0;
    let highestPrize = null;
    
    const redCombinations = generateCombinations(gameState.selectedRedBalls, 6);
    
    for (const redCombination of redCombinations) {
        for (const blueBall of gameState.selectedBlueBalls) {
            const redMatch = countMatches(redCombination, gameState.winningRedBalls);
            const blueMatch = blueBall === gameState.winningBlueBall ? 1 : 0;
            
            const prize = getPrize(redMatch, blueMatch);
            
            if (prize) {
                totalPrize += prize.amount;
                totalWins++;
                
                if (!highestPrize || prize.amount > highestPrize.amount) {
                    highestPrize = prize;
                }
            }
        }
    }
    
    totalPrize *= gameState.multiplier;
    gameState.asset += totalPrize;
    
    showResult(totalPrize, totalWins, highestPrize);
}

function generateCombinations(arr, k) {
    const result = [];
    const combine = (start, current) => {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            combine(i + 1, current);
            current.pop();
        }
    };
    combine(0, []);
    return result;
}

function countMatches(arr1, arr2) {
    return arr1.filter(num => arr2.includes(num)).length;
}

function getPrize(redMatch, blueMatch) {
    for (const key of Object.keys(PRIZES)) {
        const prize = PRIZES[key];
        if (prize.match.red === redMatch && prize.match.blue === blueMatch) {
            return prize;
        }
    }
    return null;
}

function showResult(totalPrize, totalWins, highestPrize) {
    document.getElementById('userRedBalls').innerHTML = '';
    gameState.selectedRedBalls.forEach(num => {
        const ball = document.createElement('div');
        ball.className = `ball ball-red ${gameState.winningRedBalls.includes(num) ? 'matched' : ''}`;
        ball.textContent = num;
        document.getElementById('userRedBalls').appendChild(ball);
    });
    
    document.getElementById('userBlueBalls').innerHTML = '';
    gameState.selectedBlueBalls.forEach(num => {
        const ball = document.createElement('div');
        ball.className = `ball ball-blue ${num === gameState.winningBlueBall ? 'matched' : ''}`;
        ball.textContent = num;
        document.getElementById('userBlueBalls').appendChild(ball);
    });
    
    document.getElementById('winningRedBalls').innerHTML = '';
    gameState.winningRedBalls.forEach(num => {
        const ball = document.createElement('div');
        ball.className = 'ball ball-red';
        ball.textContent = num;
        document.getElementById('winningRedBalls').appendChild(ball);
    });
    
    document.getElementById('winningBlueBalls').innerHTML = '';
    const blueBall = document.createElement('div');
    blueBall.className = 'ball ball-blue';
    blueBall.textContent = gameState.winningBlueBall;
    document.getElementById('winningBlueBalls').appendChild(blueBall);
    
    const prizeName = highestPrize ? I18N.getTranslation(`prizes.${highestPrize.id}`) || highestPrize.name : I18N.getTranslation('result.prize.none');
    document.getElementById('prizeLevel').textContent = prizeName;
    document.getElementById('prizeCount').textContent = totalWins;
    document.getElementById('prizeAmount').textContent = totalPrize.toLocaleString();
    
    document.getElementById('drawArea').style.display = 'none';
    document.getElementById('resultModal').style.display = 'flex';
}

function backToSelect() {
    gameState.gamePhase = 'selecting';
    gameState.selectedRedBalls = [];
    gameState.selectedBlueBalls = [];
    
    document.querySelectorAll('.ball').forEach(ball => ball.classList.remove('selected'));
    document.getElementById('redCount').textContent = '0';
    document.getElementById('blueCount').textContent = '0';
    
    document.getElementById('previewRedBalls').innerHTML = '';
    document.getElementById('previewBlueBalls').innerHTML = '';
    
    document.getElementById('drawnRedBalls').innerHTML = '';
    document.getElementById('drawnBlueBall').innerHTML = '';
    
    document.getElementById('resultModal').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    
    calculateNotes();
    renderAsset();
}

function renderAsset() {
    document.getElementById('assetValue').textContent = gameState.asset.toLocaleString();
}

function initApp() {
    I18N.init();
    initGame();
    
    document.getElementById('multiMinus').addEventListener('click', () => {
        if (gameState.multiplier > 1) {
            gameState.multiplier--;
            updateMultiplier();
            calculateNotes();
        }
    });
    
    document.getElementById('multiPlus').addEventListener('click', () => {
        if (gameState.multiplier < 99) {
            gameState.multiplier++;
            updateMultiplier();
            calculateNotes();
        }
    });
    
    document.getElementById('clearBtn').addEventListener('click', clearSelection);
    document.getElementById('randomBtn').addEventListener('click', randomSelect);
    document.getElementById('orderBtn').addEventListener('click', generateOrder);
    document.getElementById('backBtn').addEventListener('click', backToSelect);
    document.getElementById('modalClose').addEventListener('click', closeModal);
}

document.addEventListener('DOMContentLoaded', initApp);