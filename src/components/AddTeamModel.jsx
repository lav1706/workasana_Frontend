import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTeam } from "../store/features/team/teamSlice.js";
const AddTeamModal = ({ show, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const dispatch = useDispatch();
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { users } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!show) {
      setTeamName("");
      setSelectedMembers([]);
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { name: teamName, member: selectedMembers };
      await dispatch(createTeam(data));
      onClose();
    } catch (err) {
      console.error("Failed to create team:", err);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Team</h2>
          <button
            onClick={onClose}
            className="text-xl font-semibold text-gray-500 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-4">
            <label className="block text-sm font-medium">Add Members</label>
            <select
              multiple
              size={5}
              value={selectedMembers}
              onChange={(e) =>
                setSelectedMembers(
                  [...e.target.selectedOptions].map((o) => o.value)
                )
              }
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {users.map((user) => (
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
