
// 页面切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 页面切换
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(item => item.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
            
            // 如果是娱乐页面，初始化五子棋游戏
            if (pageId === 'entertainment') {
                initGobang();
            }
        });
    });
    
    // 轮播图功能
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let isPlaying = true;
    let slideInterval;
    
    // 初始化轮播
    function initSlider() {
        slideInterval = setInterval(nextSlide, 3000);
        updateIndicators();
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentSlide = (currentSlide + 1) % 3;
        updateSlider();
    }
    
    // 上一张幻灯片
    function prevSlide() {
        currentSlide = (currentSlide - 1 + 3) % 3;
        updateSlider();
    }
    
    // 更新轮播图
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateIndicators();
    }
    
    // 更新指示器
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 切换播放/暂停
    function togglePlayPause() {
        if (isPlaying) {
            clearInterval(slideInterval);
            playPauseBtn.textContent = '开始轮播';
        } else {
            initSlider();
            playPauseBtn.textContent = '暂停轮播';
        }
        isPlaying = !isPlaying;
    }
    
    // 事件监听
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // 指示器点击事件
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentSlide = parseInt(this.getAttribute('data-index'));
            updateSlider();
        });
    });
    
    // 初始化轮播
    initSlider();
    
    // 初始化五子棋游戏
    initGobang();
    
    // 代码帮助功能
    document.getElementById('generate-code-btn').addEventListener('click', function() {
        const question = document.getElementById('code-question').value;
        const codeResult = document.getElementById('code-result');
        
        if (!question.trim()) {
            codeResult.textContent = '请输入你的编程问题！';
            return;
        }
        
        // 简单的问题匹配
        if (question.includes('计算器') || question.includes('calculator')) {
            codeResult.textContent = `// 简单计算器实现
function calculator(num1, operator, num2) {
    switch(operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : '错误：除数不能为0';
        default: return '无效的操作符';
    }
}

// 示例用法
console.log(calculator(5, '+', 3)); // 输出: 8
console.log(calculator(10, '/', 2)); // 输出: 5`;
        } else if (question.includes('数组') || question.includes('array')) {
            codeResult.textContent = `// 数组常用操作示例
const fruits = ['苹果', '香蕉', '橙子'];

// 1. 添加元素
fruits.push('葡萄'); // 末尾添加
fruits.unshift('芒果'); // 开头添加

// 2. 删除元素
fruits.pop(); // 删除最后一个
fruits.shift(); // 删除第一个

// 3. 遍历数组
fruits.forEach((fruit, index) => {
    console.log(\`第\${index+1}个水果是：\${fruit}\`);
});

// 4. 数组映射
const upperFruits = fruits.map(fruit => fruit.toUpperCase());

// 5. 数组过滤
const longFruits = fruits.filter(fruit => fruit.length > 2);`;
        } else if (question.includes('循环') || question.includes('loop')) {
            codeResult.textContent = `// JavaScript循环示例

// 1. for循环
for (let i = 0; i < 5; i++) {
    console.log('for循环: i =', i);
}

// 2. while循环
let j = 0;
while (j < 5) {
    console.log('while循环: j =', j);
    j++;
}

// 3. do-while循环
let k = 0;
do {
    console.log('do-while循环: k =', k);
    k++;
} while (k < 5);

// 4. for...of循环 (用于数组)
const colors = ['红色', '绿色', '蓝色'];
for (const color of colors) {
    console.log('颜色:', color);
}

// 5. for...in循环 (用于对象)
const person = {name: '小蕾', age: 18, school: '苏州经贸'};
for (const key in person) {
    console.log(\`\${key}: \${person[key]}\`);
}`;
        } else {
            codeResult.textContent = `// 根据你的问题，这里是一个通用的代码结构示例：

// 1. 函数定义
function solveProblem(input) {
    // 处理输入
    let result = processInput(input);
    
    // 返回结果
    return result;
}

// 2. 辅助函数
function processInput(data) {
    // 在这里实现你的逻辑
    return data;
}

// 3. 事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 页面加载完成后执行
    console.log('页面已加载');
    
    // 这里可以添加更多初始化代码
});

// 提示：请更具体地描述你的问题，我可以提供更精确的代码示例！
// 例如："如何用JavaScript实现表单验证？"`;
        }
    });
    
    // 留言板功能
    document.getElementById('submit-message-btn').addEventListener('click', function() {
        const name = document.getElementById('message-name').value.trim();
        const email = document.getElementById('message-email').value.trim();
        const content = document.getElementById('message-content').value.trim();
        const formError = document.getElementById('form-error');
        const messagesContainer = document.getElementById('messages-container');
        
        // 清除之前的错误信息
        formError.style.display = 'none';
        
        // 验证输入
        if (!name) {
            showError('请输入您的姓名！');
            return;
        }
        
        if (!content) {
            showError('留言内容不能为空！');
            return;
        }
        
        // 检查非法内容（简单示例）
        const illegalWords = ['fuck', 'shit', 'damn', '傻逼', '垃圾', '混蛋'];
        const hasIllegalWord = illegalWords.some(word => 
            content.toLowerCase().includes(word.toLowerCase())
        );
        
        if (hasIllegalWord) {
            showError('留言内容包含不适当的语言，请修改后重新提交！');
            return;
        }
        
        // 创建新留言
        const newMessage = document.createElement('div');
        newMessage.className = 'message-item';
        
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        
        newMessage.innerHTML = `
            <div class="message-header">
                <span class="message-author">${name}</span>
                <span class="message-time">${dateStr}</span>
            </div>
            <div class="message-content">${content}</div>
        `;
        
        // 添加到留言列表顶部
        messagesContainer.insertBefore(newMessage, messagesContainer.firstChild);
        
        // 清空表单
        document.getElementById('message-name').value = '';
        document.getElementById('message-email').value = '';
        document.getElementById('message-content').value = '';
        
        // 显示成功消息
        showError('留言提交成功！', 'success');
        
        // 3秒后隐藏成功消息
        setTimeout(() => {
            formError.style.display = 'none';
        }, 3000);
    });
    
    function showError(message, type = 'error') {
        const formError = document.getElementById('form-error');
        formError.textContent = message;
        formError.style.display = 'block';
        formError.style.color = type === 'error' ? '#ff4757' : '#2ed573';
    }
});

// 五子棋游戏
let gobangBoard = [];
let currentPlayer = 'black'; // 'black' 或 'white'
let gameOver = false;
let moveHistory = [];

function initGobang() {
    const boardElement = document.getElementById('gobang-board');
    if (!boardElement) return;
    
    // 清空棋盘
    boardElement.innerHTML = '';
    gobangBoard = [];
    currentPlayer = 'black';
    gameOver = false;
    moveHistory = [];
    
    // 更新游戏状态显示
    updateGameStatus();
    
    // 创建15x15的棋盘
    for (let row = 0; row < 15; row++) {
        gobangBoard[row] = [];
        for (let col = 0; col < 15; col++) {
            gobangBoard[row][col] = null;
            
            const cell = document.createElement('div');
            cell.className = 'gobang-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            // 添加点击事件
            cell.addEventListener('click', () => placePiece(row, col));
            
            boardElement.appendChild(cell);
        }
    }
    
    // 添加游戏控制按钮事件
    document.getElementById('restart-btn').addEventListener('click', initGobang);
    document.getElementById('undo-btn').addEventListener('click', undoMove);
    document.getElementById('hint-btn').addEventListener('click', showHint);
}

function placePiece(row, col) {
    if (gameOver || gobangBoard[row][col] !== null) return;
    
    // 放置棋子
    gobangBoard[row][col] = currentPlayer;
    moveHistory.push({row, col, player: currentPlayer});
    
    // 在棋盘上显示棋子
    const boardElement = document.getElementById('gobang-board');
    const cell = boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    
    const piece = document.createElement('div');
    piece.className = `piece ${currentPlayer}`;
    cell.appendChild(piece);
    
    // 检查是否获胜
    if (checkWin(row, col)) {
        gameOver = true;
        document.getElementById('winner-message').textContent = `${currentPlayer === 'black' ? '黑子' : '白子'}获胜！`;
        document.getElementById('winner-message').style.color = currentPlayer === 'black' ? '#000' : '#555';
        document.getElementById('winner-message').style.fontWeight = 'bold';
        return;
    }
    
    // 切换玩家
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    updateGameStatus();
}

function checkWin(row, col) {
    const directions = [
        [0, 1],   // 水平
        [1, 0],   // 垂直
        [1, 1],   // 对角线（右下）
        [1, -1]   // 对角线（左下）
    ];
    
    const player = gobangBoard[row][col];
    
    for (const [dx, dy] of directions) {
        let count = 1; // 当前位置已经有一颗棋子
        
        // 正向检查
        for (let i = 1; i <= 4; i++) {
            const newRow = row + dx * i;
            const newCol = col + dy * i;
            
            if (
                newRow >= 0 && newRow < 15 &&
                newCol >= 0 && newCol < 15 &&
                gobangBoard[newRow][newCol] === player
            ) {
                count++;
            } else {
                break;
            }
        }
        
        // 反向检查
        for (let i = 1; i <= 4; i++) {
            const newRow = row - dx * i;
            const newCol = col - dy * i;
            
            if (
                newRow >= 0 && newRow < 15 &&
                newCol >= 0 && newCol < 15 &&
                gobangBoard[newRow][newCol] === player
            ) {
                count++;
            } else {
                break;
            }
        }
        
        // 如果有5个连续的棋子，则获胜
        if (count >= 5) {
            return true;
        }
    }
    
    return false;
}

function updateGameStatus() {
    const statusElement = document.getElementById('game-status');
    const playerElement = document.getElementById('current-player');
    
    if (statusElement && playerElement) {
        playerElement.textContent = currentPlayer === 'black' ? '黑子' : '白子';
        playerElement.style.color = currentPlayer === 'black' ? '#000' : '#555';
        playerElement.style.fontWeight = 'bold';
    }
    
    // 清空获胜消息
    document.getElementById('winner-message').textContent = '';
}

function undoMove() {
    if (moveHistory.length === 0 || gameOver) return;
    
    const lastMove = moveHistory.pop();
    gobangBoard[lastMove.row][lastMove.col] = null;
    
    // 从棋盘上移除棋子
    const boardElement = document.getElementById('gobang-board');
    const cell = boardElement.querySelector(`[data-row="${lastMove.row}"][data-col="${lastMove.col}"]`);
    cell.innerHTML = '';
    
    // 切换回上一个玩家
    currentPlayer = lastMove.player;
    updateGameStatus();
    
    // 如果游戏结束了，重新开始游戏状态
    if (gameOver) {
        gameOver = false;
        document.getElementById('winner-message').textContent = '';
    }
}

function showHint() {
    if (gameOver) return;
    
    // 简单提示：寻找空位放置棋子
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
            if (gobangBoard[row][col] === null) {
                // 模拟放置棋子
                gobangBoard[row][col] = currentPlayer;
                
                // 检查这个位置是否可以形成4连
                if (checkPotentialWin(row, col, 4)) {
                    gobangBoard[row][col] = null;
                    
                    // 高亮提示位置
                    const boardElement = document.getElementById('gobang-board');
                    const cell = boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                    cell.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
                    
                    // 3秒后取消高亮
                    setTimeout(() => {
                        cell.style.backgroundColor = '';
                    }, 3000);
                    
                    return;
                }
                
                gobangBoard[row][col] = null;
            }
        }
    }
    
    // 如果没有找到好的位置，随机选择一个空位
    const emptyCells = [];
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 15; col++) {
            if (gobangBoard[row][col] === null) {
                emptyCells.push({row, col});
            }
        }
    }
    
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const boardElement = document.getElementById('gobang-board');
        const cell = boardElement.querySelector(`[data-row="${randomCell.row}"][data-col="${randomCell.col}"]`);
        cell.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
        
        // 3秒后取消高亮
        setTimeout(() => {
            cell.style.backgroundColor = '';
        }, 3000);
    }
}

function checkPotentialWin(row, col, targetCount) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    
    const player = currentPlayer;
    
    for (const [dx, dy] of directions) {
        let count = 1;
        
        // 正向检查
        for (let i = 1; i <= 4; i++) {
            const newRow = row + dx * i;
            const newCol = col + dy * i;
            
            if (
                newRow >= 0 && newRow < 15 &&
                newCol >= 0 && newCol < 15 &&
                gobangBoard[newRow][newCol] === player
            ) {
                count++;
            } else {
                break;
            }
        }
        
        // 反向检查
        for (let i = 1; i <= 4; i++) {
            const newRow = row - dx * i;
            const newCol = col - dy * i;
            
            if (
                newRow >= 0 && newRow < 15 &&
                newCol >= 0 && newCol < 15 &&
                gobangBoard[newRow][newCol] === player
            ) {
                count++;
            } else {
                break;
            }
        }
        
        if (count >= targetCount) {
            return true;
        }
    }
    
    return false;
}