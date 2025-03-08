import { MdOutlineAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const getLinkClass = (path: string): string =>
    router.pathname === path
      ? "text-blue-500 cursor-pointer"
      : "text-gray-300 hover:text-white cursor-pointer";

  return (
    <div className="py-5 px-12 flex items-center justify-between bg-black border-b border-gray-800 relative z-40">
      <h2 className="text-white font-semibold text-2xl">Automify</h2>
      <div className="flex gap-12">
        <p className={getLinkClass("/ticket")} onClick={() => router.push("/ticket")}>
          Home
        </p>
        <p className={getLinkClass("/about")} onClick={() => router.push("/about")}>
          About
        </p>
        <p className={getLinkClass("/community")} onClick={() => router.push("/community")}>
          Community
        </p>
      </div>
      <div className="relative">
        <MdOutlineAccountCircle
          className="text-gray-300 cursor-pointer text-3xl"
          onClick={() => setIsClicked(!isClicked)}
        />
        
        {isClicked && (
          <div className="absolute top-10 right-0 w-48 bg-gray-900 rounded-md border border-gray-800 py-3 shadow-lg z-50">
            <div className="flex flex-col px-3">
              <p className="text-white font-medium">Username</p>
              <p className="text-gray-400 text-sm">username@gmail.com</p>
            </div>
            <div className="px-2 mt-2 flex flex-col gap-1">
              <div className="px-1 py-1 text-white hover:bg-gray-800 text-sm cursor-pointer cursor-pointer rounded-md">Dashboard</div>
              <div className="px-1 py-1 text-white hover:bg-gray-800 text-sm cursor-pointer cursor-pointer rounded-md">Account Setting</div>
              <button className="px-1 py-1 text-center text-black bg-white rounded-md cursor-pointer hover:bg-gray-100 mt-2 text-sm font-medium">Log Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
