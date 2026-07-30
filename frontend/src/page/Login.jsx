import { ArrowRight, Mail } from "lucide-react";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";

 function Login() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] flex items-center justify-center px-4 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-cyan-400 rounded-full blur-[130px] opacity-20 -top-20 -left-20"></div>
      <div className="absolute w-72 h-72 bg-white rounded-full blur-[150px] opacity-10 top-20 right-10"></div>

      <div className="relative w-full max-w-md rounded-[30px] border border-zinc-700/70 bg-[#111114]/80 backdrop-blur-xl p-8 overflow-hidden">

        {/* Top Glow */}
        <div className="absolute -top-12 -left-10 w-40 h-40 bg-cyan-400 blur-[70px] opacity-40 rounded-full"></div>

        {/* Light Reflection */}
        <div className="absolute -top-24 right-0 w-60 h-60 rotate-45 bg-white/10 blur-3xl"></div>

        <div className="relative z-10">

          <h1 className="text-5xl font-semibold text-white">
            Welcome <span className="text-zinc-400">back</span>
          </h1>

          <p className="text-zinc-500 mt-2">
            Sign in to your account
          </p>

          {/* Email */}
          <div className="mt-10">

            <label className="text-zinc-500 text-xs">
              Email
            </label>

            <div className="mt-2 flex items-center bg-[#1a1a1d] border border-zinc-700 rounded-full overflow-hidden">

              <input
                type="email"
                placeholder="username@gmail.com"
                className="flex-1 bg-transparent outline-none px-5 py-3 text-white placeholder:text-zinc-500"
              />

              <button className="mr-2 w-11 h-11 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-400 flex items-center justify-center hover:scale-105 duration-300">
                <ArrowRight size={18} color="black" />
              </button>

            </div>

          </div>

          {/* Divider */}

          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-[1px] bg-zinc-700"></div>
            <span className="text-zinc-500 text-xs">
              OR
            </span>
            <div className="flex-1 h-[1px] bg-zinc-700"></div>
          </div>

          {/* Google */}

          <button className="w-full flex items-center justify-between px-5 py-3 rounded-full border border-zinc-700 bg-[#18181b] hover:bg-[#202024] duration-300">

            <div className="flex items-center gap-3">

              <FaGoogle className="text-white" />

              <span className="text-zinc-300 text-sm">
                Continue with Google
              </span>

            </div>

            <ArrowRight size={18} className="text-zinc-500" />

          </button>

          {/* X */}

          <button className="mt-4 w-full flex items-center justify-between px-5 py-3 rounded-full border border-zinc-700 bg-[#18181b] hover:bg-[#202024] duration-300">

            <div className="flex items-center gap-3">

              <FaXTwitter className="text-white" />

              <span className="text-zinc-300 text-sm">
                Continue with X
              </span>

            </div>

            <ArrowRight size={18} className="text-zinc-500" />

          </button>

          {/* Footer */}

          <p className="text-center text-zinc-500 text-sm mt-10">
            Don't have an account?
            <span className="text-cyan-400 cursor-pointer ml-2 hover:underline">
              Sign up
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login