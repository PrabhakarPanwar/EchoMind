import { useMutation, useQueryClient } from "@tanstack/react-query";
import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function Login() {

  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [seeThrough, setSeeThrough] = useState(false);

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({

    mutationFn: async (obj) => {
      const res = await axiosInstance.post("/login", obj);
      return res.data
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.setQueryData(["auth", "me"], data.user);
      queryClient.invalidateQueries(["auth", "me"]);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      const message = error.response?.data?.error
        || "Something went wrong"
      toast.error(message)
    }

  })

  const handleSend = async (e) => {
    e.preventDefault();
    if (!email || !pwd) {
      toast.error("All fields are required");
      return;
    }

    mutate({ email, pwd })
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
            Welcome <span className="text-zinc-400">back</span>
          </h1>

          <p className="text-zinc-500 mt-2">Sign in to your account</p>

          {/* Email */}
          <form onSubmit={handleSend} className="my-10">
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
              <div className="absolute right-4">
                {seeThrough ? (
                  <img
                    className="invert cursor-pointer"
                    onClick={() => setSeeThrough(false)}
                    src={assets.eye}
                    alt=""
                  />
                ) : (
                  <img
                    className="invert cursor-pointer"
                    onClick={() => setSeeThrough(true)}
                    src={assets.eye_off}
                    alt=""
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-4 h-10 w-full flex items-center justify-center cursor-pointer bg-[#1a1a1d] border border-zinc-700 rounded-full overflow-hidden disabled:cursor-not-allowed"
            >
              {isPending ? (
                <div className="h-5 w-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}

          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-zinc-700"></div>
            <span className="text-zinc-500 text-xs">OR</span>
            <div className="flex-1 h-px bg-zinc-700"></div>
          </div>

          {/* Google */}

          <button className="w-full flex items-center justify-between px-5 py-3 rounded-full border border-zinc-700 bg-[#18181b] hover:bg-[#202024] duration-300">
            <div className="flex items-center gap-3">
              <img src={assets.google_icon} alt="" />

              <span className="text-zinc-300 text-sm">
                Continue with Google
              </span>
            </div>
            <img src={assets.arrow_right_icon} alt="" />
          </button>

          {/* Footer */}

          <p className="text-center text-zinc-500 text-sm mt-10">
            Don't have an account?
            <Link
              to="/register"
              className="text-cyan-400 cursor-pointer ml-2 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
