const signupFormHandler = async function (event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard'); // Redirect to dashboard
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to sign up.');
      }
    } catch (error) {
      alert('Failed to sign up due to an internal error.');
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);