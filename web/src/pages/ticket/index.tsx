import CustomDropdown from "@/components/CustomDropdown";
import Navbar from "@/components/Navbar";
import Selector from "@/components/Selector";
import { addClient } from "@/services/client_service";
import { addRequest } from "@/services/request_service";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function index() {

    const [clientData, setClientData] = useState({
        name: "",
        email: "",
        company: "",
    });
    const [isPopoutVisible, setPopoutVisible] = useState(false);
    const [requestData, setRequestData] = useState({
        title: "",
        description: "",
        priority: "Low",
        client_id: "",
        assigned_users: [],
    });

    const handleChangeClientData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientData({
            ...clientData,
            [name]: value,
        });
    };

    const handleChangeRquestData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRequestData({
            ...requestData,
            [name]: value,
        });
    };

    const handleAddClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addClient(clientData);
            clientNotify();
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    const handleAddRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addRequest(requestData);
            requestNotify();
            setPopoutVisible(true);
        } catch (err) {
            console.log("Error: ", err);
        }
    };

    const handleClientSelect = (clientId: string) => {
        setRequestData((prevData) => ({
            ...prevData,
            client_id: clientId
        }));
    };

    const handleUsersSelect = (selectedUserIds: any) => {
        setRequestData((prevData) => ({
            ...prevData,
            assigned_users: selectedUserIds,
        }));
    };

    const clientNotify = () => toast('New client has been added', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
        transition: Bounce,
        toastId: 'unique-client-notify'
    });

    const requestNotify = () => toast('New request has been added', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
        transition: Bounce,
    });

    return (
        <div className="bg-black min-h-screen relative pt-20">
            <Navbar />
            {isPopoutVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800/70 bg-opacity-70 z-99">
                    <div className="bg-black p-6 rounded-md shadow-lg">
                        <img src="assets/trello_board.png" className="w-160 h-80" />
                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-white px-4 py-2 font-semibold shadow-md rounded-md cursor-pointer bg-gray-100"
                                onClick={() => setPopoutVisible(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex gap-12 p-12">
                <form className="rounded-xl border-1 border-gray-800 p-4 flex flex-col gap-4" onSubmit={handleAddClient}>
                    <h2 className="text-white text-xl">Client Information</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Name</p>
                            <input 
                                placeholder="Jane Smith" 
                                className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"
                                onChange={handleChangeClientData}
                                value={clientData.name}
                                name="name"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Email</p>
                            <input 
                                placeholder="janesmith@gmail.com" 
                                className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"
                                onChange={handleChangeClientData}
                                value={clientData.email}
                                name="email"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Company</p>
                            <input 
                                placeholder="thecompany" 
                                className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"
                                onChange={handleChangeClientData}
                                value={clientData.company}
                                name="company"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button className="rounded-lg bg-white py-2 px-3 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100" type="submit">Save Client</button>
                        <button className="rounded-lg bg-red-500 py-2 px-3 font-semibold text-gray-600 cursor-pointer hover:bg-red-400">Reset</button>
                    </div>
                </form>
                <form className="rounded-xl border-1 border-gray-800 p-4 flex flex-col gap-4 w-[30%]" onSubmit={handleAddRequest}>
                    <h2 className="text-white text-xl">The Request</h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-white rounded-md">Client</p>
                            <CustomDropdown onClientSelect={handleClientSelect}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Title</p>
                            <input 
                                placeholder="Title of the request" 
                                className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"
                                onChange={handleChangeRquestData}
                                name="title"
                                value={requestData.title}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Description</p>
                            <textarea 
                                rows={5} 
                                placeholder="Description of the request" 
                                className=" font-light text-gray-200 bg-gray-800 py-1 px-3 rounded-md border-1 border-gray-600 outline-none"
                                onChange={handleChangeRquestData}
                                name="description"
                                value={requestData.description}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white rounded-md">Priority</p>
                            <select 
                                className="bg-gray-800 text-white rounded-md border-1 border-gray-600 p-1 outline-none"
                                onChange={handleChangeRquestData}
                                value={requestData.priority}
                                name="priority"
                            >
                                <option value={"Low"}>Low</option>
                                <option value={"Medium"}>Medium</option>
                                <option value={"High"}>High</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-white">Assigned To</p>
                            <Selector onUserSelect={handleUsersSelect}/>
                        </div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <button className="rounded-lg bg-white py-2 px-3 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100" type="submit">Submit Request</button>
                        <button className="rounded-lg bg-red-500 py-2 px-3 font-semibold text-gray-600 cursor-pointer hover:bg-red-400">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}