import CustomDropdown from "@/components/CustomDropdown";
import Navbar from "@/components/Navbar";
import Selector from "@/components/Selector";

export default function index() {
    return (
        <div className="bg-black min-h-screen relative pt-20">
            <Navbar />
            <div className="flex gap-12 p-12">
                <div className="rounded-xl border-1 border-gray-800 p-4 flex flex-col gap-4">
                    <h2 className="text-white text-xl">Client Information</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Name</p>
                            <input placeholder="Jane Smith" className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Email</p>
                            <input placeholder="janesmith@gmail.com" className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Company</p>
                            <input placeholder="thecompany" className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"/>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button className="rounded-lg bg-white py-2 px-3 font-semibold text-gray-600 cursor-pointer">Save Client</button>
                        <button className="rounded-lg bg-red-500 py-2 px-3 font-semibold text-gray-600 cursor-pointer">Reset</button>
                    </div>
                </div>
                <div className="rounded-xl border-1 border-gray-800 p-4 flex flex-col gap-4 w-[30%]">
                    <h2 className="text-white text-xl">The Request</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-white rounded-md">Client</p>
                            <CustomDropdown />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Title</p>
                            <input placeholder="Title of the request" className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Description</p>
                            <textarea rows={5} placeholder="Description of the request" className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white rounded-md">Priority</p>
                            <select className="bg-gray-800 text-white rounded-md border-1 border-gray-600 p-1 outline-none">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Assigned To</p>
                            <Selector />
                        </div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <button className="rounded-lg bg-white py-2 px-3 font-semibold text-gray-600 cursor-pointer">Submit Request</button>
                        <button className="rounded-lg bg-red-500 py-2 px-3 font-semibold text-gray-600 cursor-pointer">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}