import React, { useState } from "react";
import { useProject } from "../Context/ProjectContext"; t
import { useAuth } from "../Context/AuthContext";

const AddProjectModal = ({ show, onClose }) => {
  const { createProject } = useProject();
  const { user } = useAuth();
  const userId = user?.id;
  console.log(userId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject({ name, description });
    onClose();
    setName("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Add Project</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Project Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              placeholder="Project details"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
