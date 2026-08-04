import React from 'react'
import { assets } from '../assets/assets.js';

function Humburger({ open, setOpen }) {

  return (
    <>
      {!open && (
        <button
          className="fixed top-3 left-3 z-50 text-white"
          onClick={() => setOpen(true)}
        >
          <img className='invert' src={assets.menu_icon} alt="" />
        </button>
      )}
    </>
  );
}

export default Humburger