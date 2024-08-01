const loginFormHandler = async function (event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  console.log('Login form submitted with:', { username, password });

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Login response status:', response.status);
      console.log('Login response body:', await response.text());

      if (response.ok) {
        console.log('Login successful');
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);