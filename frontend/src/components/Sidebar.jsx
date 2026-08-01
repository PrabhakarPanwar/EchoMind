import React from "react";
import { NavLink } from 'react-router-dom'
import { useAuth } from './../../hook/useAuth';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import axiosInstance from "../../api/axios";


function Sidebar({ open, setOpen }) {

  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const userr = window.localStorage.getItem("name", name)

  const { mutate: logout, isPending: loggingOut } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post("/logout");
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "me"], null);
      toast.success(data?.message || "Logged out");
    },
    onError: () => {
      toast.error("Something went wrong logging out");
    },
  });
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 "
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed
          top-0 left-0
          h-screen
          w-72
          bg-[#151f36]
          border-r border-gray-700
          p-2
          z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white "
          onClick={() => setOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6L18 18" />
          </svg>
        </button>

        {/* Chat Icon */}
        <div className="flex gap-2 p-4 mt-8 md:mt-0">
          <span className="h-10 w-10 rounded-[10px] p-2 bg-linear-to-br from-[#916CFB] via-[#7C70FA] to-[#5A76FD]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 20L20 4" />
              <path d="M18 2L19 4L21 5L19 6L18 8L17 6L15 5L17 4Z" />
              <path d="M6 4V6" />
              <path d="M5 5H7" />
              <path d="M18 14V16" />
              <path d="M17 15H19" />
            </svg>
          </span>

          <div>
            <h1 className="text-[22px] font-bold text-white">
              Quick GPT
            </h1>
            <p className="text-[14px] font-medium text-[#94a3b8]">
              Intelligent AI Assistant
            </p>
          </div>
        </div>

        {/* New Chat */}
        <button
          className="rounded-md text-white font-bold my-8 w-full h-10
          bg-linear-to-br from-[#916CFB] via-[#7C70FA] to-[#5A76FD]
          hover:from-[#A78BFA]
          hover:via-[#8B5CF6]
          hover:to-[#6366F1]
          transition-all duration-300"
        >
          + New Chat
        </button>

        {/* Recent Chats */}
        <div className="text-white my-2">
          <NavLink to="/history" className="flex gap-2 p-2 text-white border border-gray-700 rounded-md cursor-pointer hover:bg-[#1e2a47]">
            <h1>Recent Chats</h1>
          </NavLink>

          <div className="border border-gray-700 rounded-md p-3 hover:bg-[#1e2a47] cursor-pointer">
            <p className="text-[14px] font-medium">
              How AI Works
            </p>

            <p className="text-[12px] text-gray-400">
              1 min ago
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="absolute flex flex-col gap-3 bottom-6 left-2 right-2">

          <NavLink to="/community" className="flex gap-2 p-2 text-white border border-gray-700 rounded-md cursor-pointer hover:bg-[#1e2a47]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-5-5L5 21" />
            </svg>

            <h1>Community Image</h1>
          </NavLink>
          <div className="text-white flex gap-2 border border-gray-700 rounded-md p-2 cursor-pointer hover:bg-[#1e2a47]">
            <span>🌙 Dark Mode</span>
            <div className="w-12 h-6 bg-gray-600 rounded-full p-1 cursor-pointer transition-all duration-300">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>

          </div>
          {isAuthenticated ? (
            <button
              onClick={() => logout()}
              disabled={loggingOut}
              className="group w-full flex items-center gap-2 p-2 text-white border border-gray-700 rounded-md cursor-pointer hover:bg-[#1e2a47] disabled:opacity-50 transition-colors duration-200"
            >
              <span className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-[#916CFB] to-[#5A76FD] flex items-center justify-center text-xs font-bold">
                {userr[0].toUpperCase()}
              </span>

              <span className="text-sm truncate">
                {loggingOut ? (
                  "Logging out…"
                ) : (
                  <span className=" font-medium">
                    Logout
                  </span>
                )}
              </span>
            </button>
          ) : (
            <NavLink to="/login" className="flex w-1/2 mx-auto gap-2 p-2 text-white border border-gray-700 rounded-md cursor-pointer  hover:bg-[#1e2a47]">
              <h1 className="mx-auto">Login</h1>
            </NavLink>
          )}

        </div>

      </div>
    </>
  );
}

export default Sidebar;