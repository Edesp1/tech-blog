async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('input[name="content"]').value.trim();
  
  // Extract postId from URL
  const id = window.location.toString().split('/').pop();

  // Send PUT request to update post
  const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
          postTitle: title, // Ensure these match your model field names
          postContent: content,
      }),
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (response.ok) {
      document.location.replace('/dashboard/');
  } else {
      alert('Failed to update post: ' + response.statusText);
  }
}

async function deleteFormHandler(event) {
  event.preventDefault();

  // Extract postId from URL
  const id = window.location.toString().split('/').pop();

  // Send DELETE request to delete post
  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
  });

  if (response.ok) {
      document.location.replace('/dashboard/');
  } else {
      alert('Failed to delete post: ' + response.statusText);
  }
}

// Add event listeners
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);