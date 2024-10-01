document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pureLoveMode').addEventListener('click', () => {
        window.location.href = 'game.html?mode=pure';
    });
    document.getElementById('aceAdmireMode').addEventListener('click', () => {
        window.location.href = 'dark.html?mode=ace';
    });
});
