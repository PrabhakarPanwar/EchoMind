import React from 'react'

function ChatBox() {
    return (
        <div className='p-5 relative'>

            {/* Chat section  */}

            <div className='flex flex-col gap-10 p-5'>

                {/* user chat */}
                <div className='w-[50%] ms-auto flex flex-row-reverse items-center gap-5'>
                    <span className='rounded-full border-amber-300 border-2 p-1'>User</span>
                    <h1 className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero velit ab facilis cumque quibusdam voluptatum, fuga sit aperiam molestias</h1>
                </div>

                {/* ai chat  */}

                <h1 className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero velit ab facilis cumque quibusdam voluptatum, fuga sit aperiam molestias</h1>


            </div>
            {/* Input section Isko Dekhliyo ek baar choti badi screen mai  */}

            <div className='w-fit lg:w-[50%] p-5 bg-black rounded-full sticky bottom-5 flex items-center gap-3 translate-x-[30%]'>
                <button className='text-white hover:text-gray-300 transition-colors'>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 5V19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M5 12H19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <input
                    type="text"
                    placeholder='what on your mind ...?'
                    className='flex-1 bg-transparent outline-none text-white placeholder:text-gray-500'
                />
                <button className='text-white hover:text-gray-300 transition-colors'>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22 2L11 13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M22 2L15 22L11 13L2 9L22 2Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>

    )
}

export default ChatBox