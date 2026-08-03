import { useMutation, useQueryClient } from "@tanstack/react-query";
import react from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { useState } from "react";
import { toast } from 'react-toastify';
import { assets } from './../assets/assets';


function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [seeThrough, setSeeThrough] = useState(false);

    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { mutate, isPending } = useMutation({

        mutationFn: async (obj) => {
            const res = await axiosInstance.post("/register", obj);
            return res.data
        },
        onSuccess: (data) => {
            toast.success(data.message)
            window.localStorage.setItem("name", data.name)
            navigate("/login", { replace: true });
        },
        onError: (error) => {
            const message = error.response?.data?.error
                || "Something went wrong"
            toast.error(message)
        }

    })

    const handleSend = () => {
        if (isPending) return
        if (!email || !pwd || !name) {
            toast.error("All fields are required");
            return;
        }
        mutate({ email, pwd, name })
    }

    return (
        <div className="h-screen w-screen bg-[#0b0b0d] flex items-center justify-center px-4 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute w-72 h-72 bg-[#171433] rounded-full blur-[130px] opacity-20 -top-20 -left-20"></div>
            <div className="absolute w-72 h-72 bg-white rounded-full blur-[150px] opacity-10 top-20 right-10"></div>

            <div className="relative w-full max-w-md rounded-[30px] border border-zinc-700/70 bg-[#111114]/80 backdrop-blur-xl p-8 overflow-hidden">
                {/* Top Glow */}
                <div className="absolute -top-12 -left-10 w-40 h-40 bg-[#2F2B5E] blur-[70px] opacity-40 rounded-full"></div>

                {/* Light Reflection */}
                <div className="absolute -top-24 right-0 w-60 h-60 rotate-45 bg-white/10 blur-3xl"></div>

                <div className="relative z-10">
                    <h1 className="text-5xl font-semibold text-white">
                        Create <span className="text-zinc-400">account</span>
                    </h1>

                    <p className="text-zinc-500 mt-2">Sign up to get started</p>

                    {/* Email */}
                    <div className="mt-10">


                        <div className="mt-2 flex items-center bg-[#1a1a1d] border border-zinc-700 rounded-full overflow-hidden">
                            <input
                                onChange={(i) => setName(i.target.value)}
                                disabled={isPending}
                                type="text"
                                value={name}
                                minLength={2}
                                placeholder="username"
                                className="flex-1 bg-transparent outline-none px-5 py-3 text-white placeholder:text-zinc-500"
                            />
                        </div>
                        <div className="mt-2 flex items-center bg-[#1a1a1d] border border-zinc-700 rounded-full overflow-hidden">
                            <input
                                onChange={(i) => setEmail(i.target.value)}
                                disabled={isPending}
                                type="email"
                                value={email}
                                placeholder="username@gmail.com"
                                className="flex-1 bg-transparent outline-none px-5 py-3 text-white placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="mt-2 flex items-center bg-[#1a1a1d] border border-zinc-700 rounded-full overflow-hidden relative">
                            <input
                                onChange={(i) => setPwd(i.target.value)}
                                disabled={isPending}
                                type={seeThrough ? "text" : "password"}
                                value={pwd}
                                minLength={8}
                                maxLength={16}
                                placeholder="enter your password"
                                className="flex-1 bg-transparent outline-none px-5 py-3 text-white placeholder:text-zinc-500"
                            />
                            <div className="absolute right-4 ">

                                {seeThrough ? (
                                    <img className="invert cursor-pointer" onClick={() => setSeeThrough(false)} src={assets.eye} alt="" />
                                ) : (
                                    <img className="invert cursor-pointer" onClick={() => setSeeThrough(true)} src={assets.eye_off} alt="" />
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleSend}
                            disabled={isPending}
                            className="mt-4 h-10 w-full flex items-center justify-center cursor-pointer bg-[#1a1a1d] border border-zinc-700 rounded-full overflow-hidden disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <div className="h-5 w-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Register"
                            )}
                        </button>



                    </div>

                    {/* Divider */}

                    <div className="flex items-center gap-3 my-8">
                        <div className="flex-1 h-px bg-zinc-700"></div>
                        <span className="text-zinc-500 text-xs">OR</span>
                        <div className="flex-1 h-px bg-zinc-700"></div>
                    </div>

                    {/* Google */}

                    <button className="w-full flex items-center justify-between px-5 py-3 rounded-full border border-zinc-700 bg-[#18181b] hover:bg-[#202024] duration-300">
                        <div className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                className="w-5 h-5"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.611 20.083H42V20H24v8h11.303C33.651 32.657 29.239 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                />
                                <path
                                    fill="#FF3D00"
                                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.318 4.337-17.694 10.691z"
                                />
                                <path
                                    fill="#4CAF50"
                                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.155 35.091 26.715 36 24 36c-5.218 0-9.617-3.317-11.283-7.946l-6.522 5.025C9.53 39.556 16.227 44 24 44z"
                                />
                                <path
                                    fill="#1976D2"
                                    d="M43.611 20.083H42V20H24v8h11.303c-1.079 3.068-3.539 5.57-6.894 6.762l.003-.002 6.19 5.238C33.97 40.573 44 33 44 24c0-1.341-.138-2.65-.389-3.917z"
                                />
                            </svg>

                            <span className="text-zinc-300 text-sm">
                                Continue with Google
                            </span>
                        </div>

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
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>

                    {/* Footer */}

                    <p className="text-center text-zinc-500 text-sm mt-10">
                        Have an account?
                        <Link to="/login" className="text-cyan-400 cursor-pointer ml-2 hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div >
    );
}

export default Register;
