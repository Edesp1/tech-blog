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

    console.log('Signup response:', response);

    if (response.ok) {
      console.log('Signup successful, redirecting to dashboard');
      document.location.replace('/dashboard'); // Redirect to dashboard after signup
    } else {
      console.error('Signup failed:', await response.text());
      alert('Failed to sign up.');
    }
  }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);