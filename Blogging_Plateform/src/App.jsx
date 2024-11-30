import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import PostPage from './pages/PostPage';
import CreateEditPost from './pages/CreateEditPost';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/create" element={<CreateEditPost />} />
        <Route path="/edit/:id" element={<CreateEditPost />} />
      </Routes>
    </Router>
  );
};

export default App;
