import React, { useState } from 'react'
import { assets, dummyChats } from './../assets/assets';

function History() {
    const [search, setSearch] = useState("")
    return (
        <div className=' flex justify-center p-5'>
            {/* Search */}
            <div className="flex gap-2 p-2 items-center justify-center text-white border border-gray-700 rounded-md">
                <img src={assets.search_icon} alt="" />
                <input
                    className="outline-none bg-transparent w-full"
                    onChange={(i) => setSearch(i.target.value)}
                    type="text"
                    placeholder="Search Conversation"
                />
            </div>
            {dummyChats.map((i) => (
                <div>

                </div>
            ))}
        </div>
    )
}

export default History