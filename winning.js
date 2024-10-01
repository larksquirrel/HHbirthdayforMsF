document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPlayer = parseInt(urlParams.get('currentPlayer'), 10); // 从URL参数获取currentPlayer的值
    const leftTextBox = document.getElementById('left-text-box');
    const rightTextBox = document.getElementById('right-text-box');
    const boardElement = document.getElementById('board');
    const actionButton = document.getElementById('step');

    // 从本地存储中获取任务清单
    const tasks = JSON.parse(localStorage.getItem('winningTasks')) || [];

    // 更新右侧文本框内容
    const rightText = currentPlayer === 1 ? "小解的愿望清单" : "老齐的礼物清单";
    const rightTextElement = document.createElement('div');
    rightTextElement.textContent = rightText;
    rightTextBox.appendChild(rightTextElement);

    // 更新左侧文本框内容
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.textContent = task;
        leftTextBox.appendChild(taskElement);
    });

    // 按钮点击事件
    actionButton.addEventListener('click', () => {
        window.location.href = 'winning1.html'; // 替换为实际的目标页面路径
    });

});