document.addEventListener('DOMContentLoaded', () => {
  const blogForm = document.getElementById('blogForm');
  const blogList = document.getElementById('blogList');
  blogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const authorName = document.getElementById('authorName').value;
    const place = document.getElementById('place').value;
    const blogTitle = document.getElementById('blogTitle').value;
    const blogContent = document.getElementById('blogContent').value;

    const data = {
      title: blogTitle,
      content: blogContent,
      authorName: authorName,
      place,
    };

    try {
      const response = await fetch('/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to submit blog');
      }
      blogForm.reset();
      fetchAndDisplayBlogs();
    } catch (error) {
      console.error('Error:', error);
    }
  });
  const fetchAndDisplayBlogs = async () => {
    try {
      const response = await fetch('/blogs');
      const blogs = await response.json();
      blogList.innerHTML = '';
      blogs.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
          <h3>${blog.title}</h3>
          <p>${blog.content}</p>
          <p>Author: ${blog.author.name}</p>
          <p>Published At: ${new Date(blog.createdAt).toLocaleString()}</p>
          <button class="delete-btn" data-id="${blog._id}">Delete</button> <!-- Add delete button -->
        `;
        blogList.appendChild(blogItem);
      });
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
          e.preventDefault();
          const blogId = e.target.dataset.id;
          try {
            const response = await fetch(`/blogs/${blogId}`, {
              method: 'DELETE'
            });
            if (!response.ok) {
              throw new Error('Failed to delete blog');
            }
            fetchAndDisplayBlogs();
          } catch (error) {
            console.error('Error deleting blog:', error);
          }
        });
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
  fetchAndDisplayBlogs();
});
