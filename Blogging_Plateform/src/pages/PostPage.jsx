import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error('Error fetching post:', error));
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p><small>Published on: {new Date(post.date).toLocaleDateString()}</small></p>
      <button onClick={() => navigate('/')}>Back</button>
    </div>
  );
};

export default PostPage;
