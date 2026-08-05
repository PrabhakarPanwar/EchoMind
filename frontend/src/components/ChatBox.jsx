import React, { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axios'
import { assets } from './../assets/assets';
import { toast } from 'react-toastify';

function ChatBox() {
    const [prompt, setPrompt] = useState("")
    const [messages, setMessages] = useState([])
    const theme = localStorage.getItem("theme") || "dark"
    const controllerRef = useRef(null)

    const { mutate, isPending, error } = useMutation({

        mutationFn: async (userPrompt) => {
            controllerRef.current = new AbortController()
            const res = await axiosInstance.post("/promptData", { prompt: userPrompt }, { signal: controllerRef.current.signal })
            return res.data;
        },
        onSuccess: (data, userPrompt) => {
            setMessages((prev) => [
                ...prev,
                { role: 'user', content: userPrompt },
                { role: 'ai', content: data.reply }
            ])
            setPrompt("")
        },

    })

    const handleSend = () => {
        if (!prompt) {
            toast.error("Prompt required");
            return;
        }

        if (isPending) return
        mutate(prompt)

    }

    const handleStop = () => {
        controllerRef.current?.abort()
    }


    return (
        <div className='flex flex-1 flex-col items-center justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14  '>

            <div className='flex-1 mb-5  overflow-y-scroll'>

                {messages.length === 0 && !isPending && (
                    <div className='h-full flex flex-col items-center justify-center gap-2 text-primary '>
                        <img className='w-full max-w-56 sm:max-w-68' src={theme === "dark" ? assets.logo_full : assets.logo_full_dark} alt="" />
                        <p className='mt-5 text-4xl sm:text-6xl leading-normal text-center text-white '>Ask me anything.</p>
                    </div>
                )}
            </div>

            {/* Chat section */}
            <div className='flex mx-auto flex-col gap-6 p-5 w-[90%] lg:w-[60%] '>
                {messages.map((msg, i) =>
                    msg.role === 'user' ? (
                        <div key={i} className='flex items-start justify-end my-4 gap-2'>
                            <div className='flex   flex-col gap-2 p-2 px-4  dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl'>
                                <p className='text-sm dark:text-primary'>{msg.content}</p>
                                <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{msg.timestamp}</span>
                            </div>
                            <span className='shrink-0 rounded-full border-amber-300 border-2 w-9 h-9 flex items-center justify-center text-xs font-medium'>User</span>
                        </div>
                    ) : (
                        <div className='flex flex-row-reverse items-start justify-end my-4 gap-2'>
                            <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4'>
                                {msg.isImage ? (
                                    <img className='w-full max-w-md mt-2 rounded-md' src={msg.content} alt="" />
                                ) : (
                                    <div className='text-sm dark:text-primary reset-tw'>{msg.content}
                                    </div>
                                )}
                                <span>{msg.timestamp}</span>
                            </div>
                            <span className='shrink-0 rounded-full border-amber-300 border-2 w-9 h-9 flex items-center justify-center text-xs font-medium'>AI</span>
                        </div>

                    )
                )}

                {isPending && (
                    <div className='w-fit flex items-end gap-3'>
                        <span className='shrink-0 rounded-full border-amber-300 border-2 w-9 h-9 flex items-center justify-center text-xs font-medium'>AI</span>
                        <div className='bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3.5 flex items-center gap-1.5'>
                            <span className='w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]' />
                            <span className='w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]' />
                            <span className='w-2 h-2 rounded-full bg-gray-400 animate-bounce' />
                        </div>
                    </div>
                )}

                {error && (
                    <div className='w-fit max-w-[80%] text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2.5'>
                        An error has occurred: {error.response?.data?.message || error.message}
                    </div>
                )}
            </div>

            <div className='w-fit lg:w-[30%] p-5 bg-black rounded-full flex items-center gap-3'>
                <button className='text-white hover:text-gray-300 transition-colors'>
                    <img className='invert' src={assets.add_button} alt="" />
                </button>
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    type="text"
                    required
                    placeholder='what on your mind ...?'
                    disabled={isPending}
                    className='flex-1 bg-transparent outline-none text-white placeholder:text-gray-500 disabled:opacity-50'
                />
                {isPending ? (
                    <button onClick={handleStop} className='text-white hover:text-gray-300 transition-colors'>
                        <img className='invert' src={assets.pause_button} alt="" />
                    </button>
                ) : (
                    <button onClick={handleSend} className="text-white hover:text-gray-300 transition-colors">
                        <img className='invert' src={assets.send_button} alt="" />
                    </button>
                )}
            </div>
        </div >
    )
}

export default ChatBox