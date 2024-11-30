import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');

    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/posts/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPosts(posts.filter(post => post._id !== id));
        } else {
          console.error('Failed to delete the post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Blog Posts</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post._id} className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold text-blue-500">
              <Link to={`/post/${post._id}`} className="hover:underline">{post.title}</Link>
            </h2>
            <p className="text-gray-700 mb-4">{post.content.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500 mb-4">
              <small>Published on: {new Date(post.date).toLocaleDateString()}</small>
            </p>
            <div className="flex space-x-4">
              <Link
                to={`/edit/${post._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </Link>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
