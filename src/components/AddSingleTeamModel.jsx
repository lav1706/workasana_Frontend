import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useParams } from "react-router-dom";
import { useTeam } from "../Context/TeamContext";

const AddSingleTeamModal = ({ show, onClose }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const { getAllUsers } = useAuth();
  const { getTeamById, addMemberToTeam } = useTeam();
  const { id } = useParams();
  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      const team = await getTeamById(id);

      if (team) {
        const memberIds = team.member.map((m) =>
          typeof m === "string" ? m : m._id
        );
        const filteredUsers = users.filter(
          (user) => !memberIds.includes(user._id)
        );
        setAvailableUsers(filteredUsers);
        console.log("Filtered users:", filteredUsers);
      } else {
        setAvailableUsers(users);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };
  useEffect(() => {
    if (show) {
      fetchUsers();
    }
  }, [show, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUserId) {
      addMemberToTeam(id, selectedUserId);
      setSelectedUserId("");
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-lg w-[90%] max-w-sm shadow-xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold">Add New Member</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm block mb-1 font-medium">
              Select User
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Choose a user --
              </option>
              {availableUsers.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-sm bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSingleTeamModal;
