import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function index() {
    
    const notify = () => toast('You are logged in', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
        transition: Bounce,
    });
    
    return (
        <div className="bg-black h-screen flex justify-center items-center">
            <div className="rounded-lg bg-gray-900 py-4 px-5">
                <h2 className="text-white font-semibold text-2xl text-center">Automify</h2>
                <form action="submit" className="mt-5">
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Username</p>
                            <input placeholder="Your username..." className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Password</p>
                            <input placeholder="Your password..." className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"/>
                        </div>  
                    </div>
                    <button className="text-black font-semibold text-md px-3 py-2 rounded-md bg-white shadow-sm cursor-pointer w-full hover:bg-gray-100">Sign In</button>
                    <button className="text-gray-400 font-semibold text-md px-3 py-2 rounded-md bg-gray-800 shadow-sm cursor-pointer w-full hover:bg-gray-700 mt-3">Create an account</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};