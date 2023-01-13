const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete Post');
    }
  }
};

const newCommentHandler = async (event) => {
  event.preventDefault();

  const text = document.querySelector('#comment-text').value.trim();
  const post_id = document.querySelector('.text-center').dataset.post_id;

  if (text && post_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ text, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/posts/${post_id}`);
    } else {
      alert('Failed to create Comment');
    }
  }
};

const deleteComment = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const postId = event.target.getAttribute('data-post_id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/posts/${postId}`);
    } else {
      alert('Failed to delete Comment');
    }
  }
};

const setUpdateComment = (text, commentId) => {
  console.log({ text, commentId });
  document.querySelector('#comment-text').value = text;
  document.querySelector('#comment-submit').innerHTML = 'Update Comment';
  document.querySelector('#comment-submit').dataset.comment_id = commentId;
};

document.querySelector('.comments').addEventListener('click', deleteComment);

document
  .querySelector('#comment-form')
  .addEventListener('submit', newCommentHandler);

// document
//   .querySelector('.comments')
//   .addEventListener('submit', '.edit-commen', setUpdateComment);

document
  .querySelector('.delete-post')
  .addEventListener('click', delButtonHandler);
