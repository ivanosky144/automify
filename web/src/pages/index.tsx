
export default function index() {
    return (
        <div className="bg-black p-2 flex items-center h-screen justify-center flex-col gap-3">
            <h1 className="text-white text-4xl font-semibold">Welcome to Automify</h1>
            <div className="flex gap-4">
                <div className="bg-white p-3 rounded-md cursor-pointer hover:bg-gray-100">
                    <a className="font-semibold text-black" href="/ticket">Send Ticket</a>
                </div>
                <div className="bg-white p-3 rounded-md cursor-pointer hover:bg-gray-100">
                    <p className="font-semibold text-black">Get Started</p>
                </div>
            </div>
        </div>
    )
}