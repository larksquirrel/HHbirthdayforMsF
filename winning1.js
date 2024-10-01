document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('step');
    const cakeImage = document.getElementById('cake-image');
    const birthdaySong = document.getElementById('birthday-song');
    let clickCount = 0; // 变量来跟踪点击次数

    // 按钮点击事件
    actionButton.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 1) {
            actionButton.textContent = '吹灭蜡烛';
            cakeImage.src = 'cake2.png';
            birthdaySong.play(); // 播放音乐
        } else if (clickCount === 2) {
            window.location.href = 'winning2.html'; // 替换为实际的目标页面路径
        }
    });

});