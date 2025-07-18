import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useProject } from "../Context/ProjectContext";

const statusOptions = ["To Do", "In Progress", "Completed", "Blocked"];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProjectById, updateProject, deleteProject, selectedProject } =
    useProject();

  const [editProjectMode, setEditProjectMode] = useState(false);
  const [editStatusMode, setEditStatusMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    const load = async () => {
      const data = await getProjectById(id);
      await getProjectById(id);
      if (data) {
        setFormData({
          name: data.name,
          description: data.description || "",
          status: data.status || "To Do",
        });
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await updateProject(id, formData);
      await getProjectById(id);
      console.log(res);
      setEditProjectMode(false);
      setEditStatusMode(false);
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      navigate("/project");
    }
  };

  if (!selectedProject) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/project"
        className="text-blue-600 hover:underline text-sm flex items-center gap-1 mb-6"
      >
        ← Back to Projects
      </Link>

      {editProjectMode ? (
        <>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded bg-gray-100"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded bg-gray-100"
          />
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setFormData({
                  name: selectedProject.name,
                  description: selectedProject.description,
                  status: selectedProject.status,
                });
                setEditProjectMode(false);
              }}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-white">{formData.name}</h1>
          <p className="text-gray-300 mt-2">{formData.description}</p>
          <p className="text-xs text-gray-400 mt-1">
            Created: {new Date(selectedProject.createdAt).toLocaleDateString()}
          </p>
          <button
            onClick={() => setEditProjectMode(true)}
            className="mt-2 text-sm px-3 py-1 bg-yellow-500 text-white rounded"
          >
            Edit Project
          </button>
        </>
      )}

      {/* STATUS SECTION */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-200 mb-1">Status</h2>
        {editStatusMode ? (
          <div className="flex gap-2">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-1 border rounded bg-gray-100"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditStatusMode(false);
                setFormData((prev) => ({
                  ...prev,
                  status: selectedProject.status,
                }));
              }}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p className="text-gray-300">{formData.status}</p>
            <button
              onClick={() => setEditStatusMode(true)}
              className="text-sm px-3 py-1 bg-yellow-500 text-white rounded"
            >
              Edit Status
            </button>
          </div>
        )}
      </div>

      <hr className="my-6 border-gray-500" />

      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete Project
      </button>
    </div>
  );
};

export default ProjectDetail;
