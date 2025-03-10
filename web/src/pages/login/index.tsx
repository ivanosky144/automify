import useAuthStore from "@/store/auth_store";
import { useRouter } from 'next/router';
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function index() {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(formData);
            router.push("/ticket");
            notify();
        } catch (err) {
            console.log("Error: ", err);
        }
      }

    const notify = () => toast('You are logged in successfully', {
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
                <form action="submit" className="mt-5" onSubmit={handleLogin}>
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Username</p>
                            <input 
                                placeholder="Your username..." 
                                className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Password</p>
                            <input 
                                placeholder="Your password..." 
                                className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>  
                    </div>
                    <button className="text-black font-semibold text-md px-3 py-2 rounded-md bg-white shadow-sm cursor-pointer w-full hover:bg-gray-100" type="submit">Sign In</button>
                    <button className="text-gray-400 font-semibold text-md px-3 py-2 rounded-md bg-gray-800 shadow-sm cursor-pointer w-full hover:bg-gray-700 mt-3" onClick={() => router.push("/register")}>Create an account</button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};