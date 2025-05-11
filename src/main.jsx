import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import DashBoard from './Dashboard'; // Ensure this file exists and is implemented

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      {/* Define routes */}
      <Route path='/' element={<App />} />
      <Route path='/dashboard' element={<DashBoard />} />
    </Routes>
  </BrowserRouter>,
);




/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; 
import './App.module.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/