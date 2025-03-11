import { MdOutlineAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUserDetail } from "@/services/user_service";
import useAuthStore from "@/store/auth_store";

interface User {
  username: string
  email: string
  role: string
};

export default function Navbar() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [userDetail, setUserDetail] = useState<User>();

  const userInfo = useAuthStore(state => state.user);

  const getLinkClass = (path: string): string =>
    router.pathname === path
      ? "text-blue-500 cursor-pointer"
      : "text-gray-300 hover:text-white cursor-pointer";

    useEffect(() => {
      const fetchClients = async () => {
        try {
          const response = await getUserDetail(Number(userInfo?.id));
          if (response) {
            setUserDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching clients:", error);
        }
      };
  
      fetchClients();
    }, []);

  return (
    <div className="fixed top-0 left-0 w-full py-5 px-12 flex items-center justify-between bg-black border-b border-gray-800 z-50">
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
              <p className="text-white font-medium">{userDetail?.username}</p>
              <p className="text-gray-400 text-sm">{userDetail?.email}</p>
            </div>
            <div className="px-2 mt-2 flex flex-col gap-1">
              <div className="px-1 py-1 text-white hover:bg-gray-800 text-sm cursor-pointer rounded-md">Dashboard</div>
              <div className="px-1 py-1 text-white hover:bg-gray-800 text-sm cursor-pointer rounded-md">Account Setting</div>
              <button className="px-1 py-1 text-center text-black bg-white rounded-md cursor-pointer hover:bg-gray-100 mt-2 text-sm font-medium" onClick={() => router.push("/login")}>Log Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

