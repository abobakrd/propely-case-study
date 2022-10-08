import React from 'react';
import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './home';
import { AddPost } from './AddPost';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="add-post" element={<AddPost />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
