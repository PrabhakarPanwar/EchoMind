import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axios'

function ChatBox() {
    const [prompt, setPrompt] = useState("")

    const { mutate, isPending, error, data } = useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.post("/promptData", { prompt })
            return res.data;
        }
    })

    return (
        <div className=' p-5'>

            {/* Chat section  */}

            <div className='flex items-center flex-col gap-10 p-5'>

                {/* user chat */}
                <div className='w-[50%] ms-auto flex flex-row-reverse items-center gap-5'>
                    <span className='rounded-full border-amber-300 border-2 p-1'>User</span>
                    <h1 className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero velit ab facilis cumque quibusdam voluptatum, fuga sit aperiam molestias</h1>
                </div>

                {/* ai chat  */}

                <div className='w-[80%] flex  items-center gap-5 '>
                    <span className='rounded-full border-amber-300 border-2 p-1'>AIsd</span>
                    <h1 className='flex-wrap' >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas voluptates, deleniti libero est maiores culpa odio aliquid, minima iure cum magnam sint earum</h1>
                </div>


            </div>
            {/* Input section Isko Dekhliyo ek baar choti badi screen mai  */}

            <div className='w-fit lg:w-[50%] p-5 bg-black rounded-full sticky bottom-0 flex items-center gap-3 translate-x-[50%] '>
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
                    onChange={(i) => setPrompt(i.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && mutate()}
                    type="text"
                    placeholder='what on your mind ...?'
                    className='flex-1 bg-transparent outline-none text-white placeholder:text-gray-500'

                />
                <button onClick={mutate} className='text-white hover:text-gray-300 transition-colors'>
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