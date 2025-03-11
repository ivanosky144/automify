import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getClients } from "@/services/client_service";

interface Client {
    id: string
    name: string
    email: string
    company: string
};

interface DropdownProps {
    onClientSelect: (selectedClient: string) => void;
  }

export default function CustomDropdown({ onClientSelect } : DropdownProps) {
    
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState(clients[0]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
          try {
            const response = await getClients();
            if (response && response.data) {
              setClients(response.data);
            }
          } catch (error) {
            console.error("Error fetching clients:", error);
          }
        };
    
        fetchClients();
      }, []);

    const handleSelect = (client : any) => {
        setSelectedClient(client);
        setOpen(false);
        onClientSelect(client.id);
    };

    return (
        <div className="relative w-full z-20">
            <button 
                className="bg-gray-800 text-white w-full py-2 px-3 rounded-md border border-gray-600 flex justify-between items-center"
                onClick={() => setOpen(!open)}
            >
                <div className="flex justify-between items-center gap-4">
                    <span>{selectedClient ? selectedClient.name : "Select a client"}</span>
                    {selectedClient && (
                    <span className="text-xs text-gray-800 bg-white py-0.5 px-1 rounded-lg font-medium">
                        {selectedClient.company}
                    </span>
                )}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {open && (
                <div className="absolute w-full mt-1 bg-gray-800 rounded-md border border-gray-600 shadow-lg">
                    {clients.map((client) => (
                        <div 
                            key={client.id} 
                            className="p-2 cursor-pointer hover:bg-gray-700 flex justify-between items-center"
                            onClick={() => handleSelect(client)}
                        >
                            <span className="text-white">{client.name}</span>
                            <span className="text-gray-300 text-xs">{client.company}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
