const loginFormHandler = async function (event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('Login response:', response);

    if (response.ok) {
      console.log('Login successful');
      document.location.replace('/dashboard');
    } else {
      console.log('Login failed');
      alert('Failed to log in.');
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
