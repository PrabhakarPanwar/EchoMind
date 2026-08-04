import React from 'react'
import { MenuIcon } from '../assets/svg.jsx'

function Humburger({ open, setOpen }) {

  return (
    <>
      {!open && (
        <button
          className="fixed top-3 left-3 z-50 text-white"
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>
      )}
    </>
  );
}

export default Humburger