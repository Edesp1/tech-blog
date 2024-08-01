const newFormHandler = async function (event) {
  event.preventDefault();

  const postTitle = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector('textarea[name="post-body"]').value;

  console.log('Form submitted with title:', postTitle, 'and body:', postContent);

  await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      postTitle,
      postContent,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/dashboard');
};

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);