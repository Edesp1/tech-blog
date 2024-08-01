const loginFormHandler = async function (event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to log in.');
      }
    } catch (error) {
      alert('Failed to log in due to an internal error.');
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);