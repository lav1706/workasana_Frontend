import React, { useEffect, useState } from "react";
import { useTeam } from "../Context/TeamContext";
import { useProject } from "../Context/ProjectContext";
import { useTask } from "../Context/TaskContext";
import { useAuth } from "../Context/AuthContext";

const AddTaskModal = ({ show, onClose }) => {
  const { createTask } = useTask();
  const { team } = useTeam();
  const { projects } = useProject();
  const { user } = useAuth();

  const [taskName, setTaskName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [timeToComplete, setTimeToComplete] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (!show) {
      setTaskName("");
      setSelectedProject("");
      setSelectedTeam("");
      setDueDate("");
      setTimeToComplete("");
      setPriority("Low");
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User object:", user);
    console.log("User ID:", user?._id);
    const newTask = {
      name: taskName,
      project: selectedProject,
      team: selectedTeam,
      dueDate: dueDate,
      timeToComplete: Number(timeToComplete),
      priority: priority,
      status: status,
      owners: [user?.id],
    };
    console.log(user);
    console.log("Submitting task:", newTask);
    try {
      await createTask(newTask);
      onClose();
    } catch (err) {
      alert("Failed to create task. Check all fields.");
      console.error("Error creating task:", err);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-xl font-semibold text-gray-500 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Project Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Select Project</label>
            <select
              className="w-full border rounded px-3 py-2 mt-1"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              required
            >
              <option value="">-- Select Project --</option>
              {projects?.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Task Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter Task Name"
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>

          {/* Team Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Select Team</label>
            <select
              className="w-full border rounded px-3 py-2 mt-1"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              required
            >
              <option value="">-- Select Team --</option>
              {team.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date & Time to Complete */}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">Time (Days)</label>
              <input
                type="number"
                value={timeToComplete}
                onChange={(e) => setTimeToComplete(e.target.value)}
                placeholder="e.g. 5"
                className="w-full border rounded px-3 py-2 mt-1"
                required
              />
            </div>
          </div>

          {/* Priority Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Priority</label>
            <select
              className="w-full border rounded px-3 py-2 mt-1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Status</label>
            <select
              className="w-full border rounded px-3 py-2 mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="To DO">To DO</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-6">
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
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
