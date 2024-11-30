import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/posts/${id}`)
        .then((response) => response.json())
        .then((data) => setForm({ title: data.title, content: data.content }))
        .catch((error) => console.error('Error fetching post:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:5000/posts/${id}` : 'http://localhost:5000/posts';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(() => navigate('/'))
      .catch((error) => console.error('Error saving post:', error));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">{id ? 'Edit' : 'Create'} Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
          <input
            id="title"
            type="text"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-medium mb-2">Content</label>
          <textarea
            id="content"
            value={form.content}
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateEditPost;
