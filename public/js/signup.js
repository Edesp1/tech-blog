const signupFormHandler = async function (event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard'); // Redirect to dashboard after signup
    } else {
      alert('Failed to sign up.');
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);