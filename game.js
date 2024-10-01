document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const messageElement = document.getElementById('dice-result');
    const rollDiceButton = document.getElementById('roll-dice');
    const currentElement = document.getElementById('currentElement');
    const nextElement = document.getElementById('nextElement');

    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');

    const player1Avatar = document.getElementById('player1-avatar');
    const player2Avatar = document.getElementById('player2-avatar');

    let currentPlayer = 1;
    const totalCells = 55;
    const positions = [1, 1]; // Player positions, starting at 1

    let player1Tasks = [];
    let player2Tasks = [];


    function updateAvatarBorders() {
        if (currentPlayer === 1) {
            player1Avatar.classList.add('active-player1');
            player2Avatar.classList.remove('active-player2');
        } else {
            player2Avatar.classList.add('active-player2');
            player1Avatar.classList.remove('active-player1');
        }
    }

    // Initial setup: Set Player 1 as the active player
    updateAvatarBorders();

    // Function to display the text for the current grid
    function displayCurrentText(position) {
        const text = document.querySelector(`.cell:nth-child(${position})`).getAttribute('data-text');
        const type = document.querySelector(`.cell:nth-child(${position})`).getAttribute('data-type');
        
        if (type === 'move') {
            currentElement.textContent = `移动点数: ${text}`;
            return parseInt(text, 10);
        }
        else {
            currentElement.textContent = `移动点数: 0`;
        }

        return 0;
    }


    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }


    function updatePlayerPositions() {
        const cells = document.querySelectorAll('.cell');

        cells.forEach(cell => {
            // 确保“起点”和“终点”的标识和颜色
            if (cell.dataset.index == 1) {
                cell.innerHTML = '起点';
                cell.style.backgroundColor = ''; // 默认颜色
                cell.style.color = ''; // 默认颜色
            } else if (cell.dataset.index == totalCells) {
                cell.innerHTML = '终点';
                cell.style.backgroundColor = ''; // 默认颜色
                cell.style.color = ''; // 默认颜色
            } else {
                cell.style.backgroundColor = ''; // 默认颜色
                cell.style.color = ''; // 默认颜色
            }
        });

        //第一遍
        const player1Position = positions[0];
        const player2Position = positions[1];

        if (player1Position > 0 && player1Position <= totalCells) {
            document.querySelector(`.cell:nth-child(${player1Position})`).style.backgroundColor = 'black';
            document.querySelector(`.cell:nth-child(${player1Position})`).style.color = 'white'; // 确保文字可读
            
        }
        if (player2Position > 0 && player2Position <= totalCells) {
            document.querySelector(`.cell:nth-child(${player2Position})`).style.backgroundColor = 'pink';
            document.querySelector(`.cell:nth-child(${player2Position})`).style.color = 'black'; // 确保文字可读


        }

    }


    function checkWin() {
        if (positions[currentPlayer - 1] === totalCells) {
            if (currentPlayer === 1) {
                messageElement.textContent = `恭喜黑眼镜获胜！`;
            } else {
                messageElement.textContent = `恭喜解雨臣获胜！`;
            }

            rollDiceButton.disabled = true;

            // 停顿3秒后跳转
            setTimeout(() => {
                const title = currentPlayer === 1 ? "老齐的礼物清单" : "小解的愿望清单";
                showWinningPage(title, currentPlayer);
            }, 3000);
        }
    }

    function showWinningPage(title, currentPlayer) {
        // 将玩家的所有任务存储到本地存储
        const tasks = currentPlayer === 1 ? player2Tasks : player1Tasks;
        localStorage.setItem('winningTasks', JSON.stringify(tasks));

        // 跳转到新的页面，并传递currentPlayer的值
        window.location.href = 'winning.html?title=' + encodeURIComponent(title) + '&currentPlayer=' + currentPlayer;
    }


    function handleRoll() {
        const diceValue = rollDice();
        const playerIndex = currentPlayer - 1;

        // 第一遍
        positions[playerIndex] = Math.min(positions[playerIndex] + diceValue, totalCells);
        updatePlayerPositions();
        messageElement.textContent = `掷骰子点数: ${diceValue}`;

        // 第二遍
        const move = displayCurrentText(positions[playerIndex]);
        positions[playerIndex] = Math.min(positions[playerIndex] + move, totalCells);
        updatePlayerPositions();

        // 获取当前格子的任务
        const currentCell = document.querySelector(`.cell:nth-child(${positions[playerIndex]})`);
        const text = currentCell.getAttribute('data-text');
        nextElement.textContent = `当前任务: ${text}`;

        // 记录任务到对应的玩家任务数组，避免重复
        if (text !== "游戏结束！可指定对方完成任意任务") {
            if (currentPlayer === 1) {
                if (!player1Tasks.includes(text)) {
                    player1Tasks.push(text);
                }
            } else {
                if (!player2Tasks.includes(text)) {
                    player2Tasks.push(text);
                }
            }
        }

        // 更新头像边框
        updateAvatarBorders();

        // 检查胜利条件
        checkWin();

        // 切换玩家
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        player1.style.color = currentPlayer === 1 ? 'black' : 'gray';
        player2.style.color = currentPlayer === 2 ? 'pink' : 'gray';
    }


    updatePlayerPositions();
    rollDiceButton.addEventListener('click', handleRoll);
});

