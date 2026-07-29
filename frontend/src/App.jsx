import { useState } from "react";
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home';
import Login from './page/Login';
import Register from './page/Register';
import History from './page/History';
import Sidebar from './components/Sidebar'
import Humburger from './components/Humburger'

function App() {

  const [open, setOpen] = useState(false);

  return (
    <div className="w-[95%]">
      <Humburger open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
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