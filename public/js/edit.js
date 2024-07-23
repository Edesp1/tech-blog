async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="content"]').value.trim();
    console.log(title);
    console.log(content);

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
      
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          body,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }

      async function deleteFormHandler(event) {
        event.preventDefault();
    
        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
          ];
          
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
          });
          
          if (response.ok) {
            document.location.replace('/dashboard/');
          } else {
            alert(response.statusText);
          }; 
    };
};

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);