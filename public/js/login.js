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

      console.log('Login response:', response);

      if (response.ok) {
        console.log('Login successful');
        document.location.replace('/dashboard'); // Redirect to dashboard or any other page
      } else {
        const result = await response.json();
        console.log('Login failed:', result.message || result);
        alert(result.message || 'Failed to log in.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to log in due to an internal error.');
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
