import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import History from './page/History';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<History />} />
      </Routes>
    </div>
  )
}

export default App