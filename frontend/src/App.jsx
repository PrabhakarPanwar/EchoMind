import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import History from './page/History';
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  )
}

export default App