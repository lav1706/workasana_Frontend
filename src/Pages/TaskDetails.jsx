import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTask } from "../Context/TaskContext";

const TaskDetail = () => {
  const { id } = useParams();
  const { getTaskById, updateTask } = useTask();

  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    team: "",
    status: "To Do",
    dueDate: "",
    timeToComplete: 0,
    priority: "Low",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      try {
        const taskData = await getTaskById(id);
        setTask(taskData);
        setFormData({
          name: taskData.name || "",
          project: taskData.project?._id || "",
          team: taskData.team?._id || "",
          status: taskData.status || "To Do",
          dueDate: taskData.dueDate ? taskData.dueDate.slice(0, 10) : "",
          timeToComplete: taskData.timeToComplete || 0,
          priority: taskData.priority || "Low",
        });
      } catch (err) {
        console.error("Failed to fetch task details:", err);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTask(id, formData);
      setIsEditing(false);

      const updatedTask = await getTaskById(id);
      setTask(updatedTask);
      setFormData({
        name: updatedTask.name || "",
        project: updatedTask.project?._id || "",
        team: updatedTask.team?._id || "",
        status: updatedTask.status || "To Do",
        dueDate: updatedTask.dueDate ? updatedTask.dueDate.slice(0, 10) : "",
        timeToComplete: updatedTask.timeToComplete || 0,
        priority: updatedTask.priority || "Low",
      });
    } catch (err) {
      alert("Failed to update task");
      console.error(err);
    }
    setLoading(false);
  };

  if (!task)
    return <div className="p-6 text-gray-100">Loading task details...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-50">
      <Link
        to="/"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Back to Tasks
      </Link>

      <h1 className="text-2xl font-bold mb-4">{task.name}</h1>

      {!isEditing ? (
        <>
          <p>
            <strong>Project:</strong> {task.project?.name || "N/A"}
          </p>
          <p>
            <strong>Team:</strong> {task.team?.name || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {task.status}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>Time to Complete (days):</strong> {task.timeToComplete}
          </p>
          <p>
            <strong>Priority:</strong> {task.priority}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Edit Task
          </button>
        </>
      ) : (
        <form onSubmit={handleSave} className="space-y-4 max-w-lg">
          <div>
            <label className="block mb-1">Task Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-50 text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-50 text-black"
              required
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-50 text-black"
            />
          </div>

          <div>
            <label className="block mb-1">Time to Complete (days)</label>
            <input
              type="number"
              name="timeToComplete"
              value={formData.timeToComplete}
              onChange={handleChange}
              min={0}
              className="w-full px-3 py-2 rounded bg-gray-50 text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-50 text-black"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 rounded  hover:bg-gray-500"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskDetail;
