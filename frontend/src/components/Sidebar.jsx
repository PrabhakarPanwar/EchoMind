import React from 'react'
// import { WandSparkles, Search, Image, SunMedium } from 'lucide-react'

function Sidebar() {
  return (
    <div className="w-70 border min-h-screen bg-[#0f172a] p-2">
     
     {/* -Chat Icon */}
      <div className="flex gap-2 p-4">
          <span className="h-10 w-10 my-2 rounded-[10px] p-2 bg-linear-to-br from-[#916CFB] via-[#7C70FA] to-[#5A76FD]">
            {/* <WandSparkles /> */}
        </span>

        <div className="">
            <h1 className="text-[22px] font-bold text-white">Quick GPT</h1>
            <p className="text-[14px] font-medium text-[#94a3b8]">Intelligent AI Assistant</p>
        </div>
      </div>

     <button className="rounded-[5px] text-white font-bold my-10 w-full h-10 bg-linear-to-br from-[#916CFB] via-[#7C70FA] to-[#5A76FD] cursor-pointer">
           + New Chat
     </button>

     {/* -search */}

     <div className="flex gap-2 p-2 text-white border border-gray-700 rounded-[5px] ">
        <span>
            {/* <Search /> */}
        </span>
        <input type="text" placeholder="Search Conversation" />
      </div>

      {/* -recent chats */}

      <div className="text-white my-4">
        <h4 className="font-medium">Recent chats</h4>

        <div className="border border-gray-700 w-full p-2">
            <p className="text-[14px] font-medium">How ai works </p>
            <p className="text-[12px]">1 min ago</p>
            </div>
            </div>

            {/* -community images */}

            <div className="flex gap-2 p-2 text-white border border-gray-700 rounded-[5px] cursor-pointer mt-40">
                <span>
                    {/* <Image /> */}
                </span>
                <h1>Community Image</h1>
            </div>

            {/* -toggle */}

            <div className="text-white mt-4 flex gap-2 border border-gray-700 p-2 cursor-pointer">
                {/* <SunMedium size={25} /> */}
                <span>Dark Mode</span>
            </div>

</div>
  )
}

export default Sidebar
       