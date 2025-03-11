import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getUsers } from "@/services/user_service";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface SelectorProps {
  onUserSelect: (selectedUsers: number[]) => void;
}

export default function Selector({ onUserSelect }: SelectorProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const toggleUser = (user: User) => {
    const updatedSelectedUsers = selectedUsers.some((u) => u.id === user.id)
      ? selectedUsers.filter((u) => u.id !== user.id)
      : [...selectedUsers, user];

    setSelectedUsers(updatedSelectedUsers);
    const selectedUserIds = updatedSelectedUsers.map((u) => u.id);
    onUserSelect(selectedUserIds);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response) {
          setUsers(response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
                {user.username}
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
                <span className="text-white">{user.username}</span>
                <span className="text-gray-300 text-xs">{user.role}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
