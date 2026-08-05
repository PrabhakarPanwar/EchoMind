import React from "react";
import { NavLink } from 'react-router-dom'
import { useAuth } from './../../hook/useAuth';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import axiosInstance from "../../api/axios";
import { assets } from "../assets/assets";


function Sidebar({ open, setOpen }) {

  const { user, isAuthenticated, isLoading } = useAuth();

  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
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
          className="fixed inset-0 bg-black/50 z-30"
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
          className="absolute top-4 right-4  "
          onClick={() => setOpen(false)}
        >
          <img className='invert' src={assets.close_icon} alt="" />
        </button>

        <>
          {isLoading ? ("Fetching data") :
            <div className="flex m-2 gap-2">
              <p className="h-6 w-6 shrink-0 rounded-full bg-linear-to-br from-[#916CFB] to-[#5A76FD] flex items-center justify-center text-xs font-bold">
                {isAuthenticated ? user.name[0].toUpperCase() : "G"}
              </p>
              <p> {isAuthenticated ? user.name : "Guest"}</p>
            </div>
          }
        </>

        {/* Chat Icon */}

        <div className="flex gap-2 p-4 mt-8 md:mt-0">
          <img className="w-full" src={assets.logo_full} alt="" />
        </div>

        {/* New Chat */}
        <button
          className="rounded-md  font-bold my-8 w-full h-10
          bg-linear-to-br from-[#916CFB] via-[#7C70FA] to-[#5A76FD]
          hover:from-[#A78BFA]
          hover:via-[#8B5CF6]
          hover:to-[#6366F1]
          transition-all duration-300"
        >
          + New Chat
        </button>

        {/* tabs -> credit,recent*/}
        <div className=" my-2 flex flex-col gap-2">
          <NavLink
            to="/credits"
            className="flex gap-2 p-2  border border-gray-700 rounded-md cursor-pointer hover:bg-[#1e2a47]"
          >
            <h1>Credits</h1>
          </NavLink>
          <NavLink
            to="/history"
            className="flex gap-2 p-2  border border-gray-700 rounded-md cursor-pointer hover:bg-[#1e2a47]"
          >
            <h1>Recent Chats</h1>
          </NavLink>

          <div className="border border-gray-700 rounded-md p-3 hover:bg-[#1e2a47] cursor-pointer">
            <p className="text-[14px] font-medium">How AI Works</p>

            <p className="text-[12px] text-gray-400">1 min ago</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="absolute flex flex-col gap-3 bottom-6 left-2 right-2">
          <NavLink
            to="/community"
            className="flex gap-2 p-2  border border-gray-700 rounded-md cursor-pointer hover:bg-[#1e2a47]"
          >
            <img className='invert' src={assets.image_icon} alt="" />
            <h1>Community Image</h1>
          </NavLink>
          <div className=" flex gap-2 border border-gray-700 rounded-md p-2 cursor-pointer hover:bg-[#1e2a47]">
            <span>🌙 Dark Mode</span>
            <div className="w-12 h-6 bg-gray-600 rounded-full p-1 cursor-pointer transition-all duration-300">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          {isLoading ? (
            <div className="h-9 w-full animate-pulse rounded-md bg-gray-700" />
          ) :
            isAuthenticated ? (
              <>
                <button
                  onClick={() => logout()}
                  disabled={isPending}
                  className="group w-1/2 mx-auto flex items-center gap-2 p-2 justify-center border border-gray-700 rounded-md cursor-pointer hover:bg-[#1e2a47] disabled:opacity-50 transition-colors duration-200"
                >
                  <p className="h-6 w-6 shrink-0 rounded-full bg-linear-to-br from-[#916CFB] to-[#5A76FD] flex items-center justify-center text-xs font-bold">
                    {user.name[0].toUpperCase()}
                  </p>

                  <span className="text-sm truncate">
                    {isPending ? (
                      "Logging out…"
                    ) : (
                      <span className=" font-medium">Logout</span>
                    )}
                  </span>
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="flex w-1/2 mx-auto gap-2 p-2 border border-gray-700 rounded-md cursor-pointer  hover:bg-[#1e2a47]"
              >
                <h1 className="mx-auto">Login</h1>
              </NavLink>
            )}
        </div>
      </div >
    </>
  );
}

export default Sidebar;