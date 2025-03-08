import { MdOutlineAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar(){
  const router = useRouter();

  const getLinkClass = (path: string): string =>
    router.pathname === path
      ? "text-blue-500 cursor-pointer"
      : "text-gray-300 hover:text-white cursor-pointer";

  return (
    <div className="py-5 px-12 flex items-center justify-between bg-black border-b-1 border-gray-800">
      <h2 className="text-white font-semibold text-2xl">Automify</h2>
      <div className="flex gap-12">
        <p
          className={getLinkClass("/ticket")}
          onClick={() => {
            router.push("/ticket");
          }}
        >
          Home
        </p>
        <p
          className={getLinkClass("/about")}
          onClick={() => {
            router.push("/about");
          }}
        >
          About
        </p>
        <p
          className={getLinkClass("/community")}
          onClick={() => {
            router.push("/community");
          }}
        >
          Community
        </p>
      </div>
      <MdOutlineAccountCircle className="text-gray-300 cursor-pointer text-3xl" />
    </div>
  );
};

