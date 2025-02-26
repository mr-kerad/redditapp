import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;