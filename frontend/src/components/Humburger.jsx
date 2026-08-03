import React from 'react'

function Humburger({ open, setOpen }) {

  return (
    <>
      {!open && (
        <button className="fixed top-3 left-3 z-50 text-white" onClick={() => setOpen(true)} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 6H20" />
            <path d="M4 12H20" />
            <path d="M4 18H20" />
          </svg>
        </button>
      )
      }
    </>
  )
}

export default Humburger