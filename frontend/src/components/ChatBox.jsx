import React, { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../api/axios'

function ChatBox() {
    const [prompt, setPrompt] = useState("")
    const [messages, setMessages] = useState([])
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
                { role: 'user', text: userPrompt },
                { role: 'ai', text: data.reply }
            ])
            setPrompt("")
        },

    })

    const handleSend = () => {
        if (isPending) return
        mutate(prompt)
    }

    const handleStop = () => {
        controllerRef.current?.abort()
    }


    return (
        <div className='flex flex-col items-center'>
            {messages.length === 0 && !isPending && (
                <div className='flex flex-col items-center text-center gap-3 px-5 pt-24 pb-10'>
                    <h1 className='text-3xl lg:text-4xl font-semibold'>What's on your mind?</h1>
                    <p className='text-gray-500 max-w-md'>
                        Ask me anything — I can help you brainstorm, explain, write, or just talk things through.
                    </p>
                </div>
            )}

            {/* Chat section */}
            <div className='flex mx-auto flex-col gap-6 p-5 w-[90%] lg:w-[60%] '>
                {messages.map((msg, i) =>
                    msg.role === 'user' ? (
                        <div key={i} className='w-fit max-w-[70%] ms-auto flex flex-row-reverse items-end gap-3'>
                            <span className='shrink-0 rounded-full border-amber-300 border-2 w-9 h-9 flex items-center justify-center text-xs font-medium'>User</span>
                            <div className='bg-amber-300/20 border border-amber-300/40 rounded-2xl rounded-br-sm px-4 py-2.5'>
                                <p className='text-sm leading-relaxed'>{msg.text}</p>
                            </div>
                        </div>
                    ) : (
                        <div key={i} className='w-full flex items-end gap-3'>
                            <span className='shrink-0 rounded-full border-amber-300 border-2 w-9 h-9 flex items-center justify-center text-xs font-medium'>AI</span>
                            <div className='rounded-2xl rounded-bl-sm px-4 py-2.5'>
                                <p className='text-sm leading-relaxed whitespace-pre-wrap'>{msg.text}</p>
                            </div>
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                ) : (
                    <button onClick={handleSend} className="text-white hover:text-gray-300 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    )
}

export default ChatBox