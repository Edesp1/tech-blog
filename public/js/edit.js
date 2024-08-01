async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();
    
    const id = window.location.toString().split('/').pop();
  
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            postTitle: title,
            postContent: content,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
  
    if (response.ok) {
        // Update the DOM immediately
        const postElement = document.querySelector(`[data-post-id="${id}"]`);
        postElement.querySelector('.card-header h2').innerText = title;
        postElement.querySelector('.card-body p').innerText = content;
        alert('Post updated successfully');
    } else {
        alert('Failed to update post: ' + response.statusText);
    }
  }
  
  async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/').pop();
  
    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });
  
    if (response.ok) {
        // Remove the post element from the DOM immediately
        const postElement = document.querySelector(`[data-post-id="${id}"]`);
        postElement.remove();
        alert('Post deleted successfully');
    } else {
        alert('Failed to delete post: ' + response.statusText);
    }
  }
  
  // Add event listeners
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);