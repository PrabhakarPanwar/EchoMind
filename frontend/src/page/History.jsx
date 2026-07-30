import React from 'react'

function History() {
    return (
        <div>
            {/* Search */}
            <div className="flex gap-2 p-2 text-white border border-gray-700 rounded-md">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20L16.65 16.65" />
                </svg>

                <input
                    className="outline-none bg-transparent w-full"
                    type="text"
                    placeholder="Search Conversation"
                />
            </div>
        </div>
    )
}

export default History