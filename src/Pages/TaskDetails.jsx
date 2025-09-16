import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById, updateTask } from "../store/features/task/taskSlice";

const TaskDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Redux se data uthana
  const { selectedTask, loading, error } = useSelector((state) => state.tasks);

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
  const [saving, setSaving] = useState(false);

  // 🔃 Page load par task fetch
  useEffect(() => {
    if (id) {
      dispatch(getTaskById(id));
    }
  }, [id, dispatch]);

  // 🎯 Jab bhi selectedTask update ho → form me bharna
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        name: selectedTask.name || "",
        project: selectedTask.project?._id || "",
        team: selectedTask.team?._id || "",
        status: selectedTask.status || "To Do",
        dueDate: selectedTask.dueDate ? selectedTask.dueDate.slice(0, 10) : "",
        timeToComplete: selectedTask.timeToComplete || 0,
        priority: selectedTask.priority || "Low",
      });
    }
  }, [selectedTask]);

  // 📝 Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Save handler
  const handleSave = (e) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    dispatch(updateTask({ id, data: formData }))
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => {
        alert("Failed to update task");
        console.error(err);
      })
      .finally(() => setSaving(false));
  };

  // ⏳ Loading states
  if (loading) return <div className="p-6 text-gray-100">Loading task...</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!selectedTask)
    return <div className="p-6 text-gray-100">Task not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-50">
      <Link
        to="/"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Back to Tasks
      </Link>

      <h1 className="text-2xl font-bold mb-4">{selectedTask.name}</h1>

      {!isEditing ? (
        <>
          <p>
            <strong>Project:</strong> {selectedTask.project?.name || "N/A"}
          </p>
          <p>
            <strong>Team:</strong> {selectedTask.team?.name || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {selectedTask.status}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {selectedTask.dueDate
              ? new Date(selectedTask.dueDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>Time to Complete (days):</strong>{" "}
            {selectedTask.timeToComplete}
          </p>
          <p>
            <strong>Priority:</strong> {selectedTask.priority}
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
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskDetail;
