document.addEventListener('DOMContentLoaded', () => {
    const password = '0123';
    let attempts = 0;

    document.getElementById('loginForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const inputPassword = document.getElementById('password').value;
        if (inputPassword === password) {
            window.location.href = 'mode.html';
        } else {
            attempts++;
            if (attempts >= 2) {
                document.getElementById('error-message').textContent = '请做基本了解后再来吧。';
                document.getElementById('password').disabled = true;
                document.querySelector('button').disabled = true;
            } else {
                document.getElementById('error-message').textContent = '您还有一次机会，请勿手滑~';
            }
        }
    });
});
