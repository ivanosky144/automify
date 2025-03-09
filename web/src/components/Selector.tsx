import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface User {
  id: number;
  name: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "Jonathan Harjanto", role: "Software Engineer" },
  { id: 2, name: "Muhammad Rifky", role: "Product Manager" },
  { id: 3, name: "Anita Rae", role: "Data Engineer" },
  { id: 4, name: "Jessica Tjahaya", role: "UI UX Designer" },
  { id: 5, name: "Ali Husaini", role: "Mobile Engineer" },
];

export default function Selector() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const toggleUser = (user: User) => {
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <div className="relative w-full">
      <button
        className="bg-gray-800 text-white w-full py-2 px-3 rounded-md border border-gray-600 flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-wrap gap-2">
          {selectedUsers.length === 0 ? (
            <span>Select users</span>
          ) : (
            selectedUsers.map((user) => (
              <span
                key={user.id}
                className="text-xs text-gray-800 bg-white py-0.5 px-1 rounded-lg font-medium"
              >
                {user.name}
              </span>
            ))
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      {open && (
        <div className="absolute w-full mt-1 bg-gray-800 rounded-md border border-gray-600 shadow-lg max-h-60 overflow-auto z-10">
          {users.map((user) => {
            const isSelected = selectedUsers.some((u) => u.id === user.id);
            return (
              <div
                key={user.id}
                className={`p-2 cursor-pointer hover:bg-gray-700 flex justify-between items-center ${
                  isSelected ? "bg-gray-700" : ""
                }`}
                onClick={() => toggleUser(user)}
              >
                <span className="text-white">{user.name}</span>
                <span className="text-gray-300 text-xs">{user.role}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
