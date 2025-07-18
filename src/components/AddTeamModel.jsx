import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useTeam } from "../Context/TeamContext";

const AddTeamModal = ({ show, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const { getAllUsers } = useAuth();
  const { createTeam } = useTeam();

  useEffect(() => {
    if (show) {
      const fetchUsers = async () => {
        try {
          const users = await getAllUsers();
          setAllUsers(users);
        } catch (err) {
          console.error("Failed to fetch users", err);
        }
      };
      fetchUsers();
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { name: teamName, member: selectedMembers };
      await createTeam(data);
      onClose();
    } catch (err) {
      console.error("Failed to create team:", err);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Team</h2>
          <button
            onClick={onClose}
            className="text-xl font-semibold text-gray-500 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Team Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Team Name</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter Team Name"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </div>

          {/* Add Members */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Add Members</label>
            <select
              multiple
              value={selectedMembers}
              onChange={(e) =>
                setSelectedMembers(
                  [...e.target.selectedOptions].map((o) => o.value)
                )
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {allUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamModal;
