import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const ProjectContext = createContext();
export const useProject = () => useContext(ProjectContext);

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState("");
  const [trigger, setTrigger] = useState(0);

  // 🔃 Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/v1/project");
      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects", err);
      setLoading(false);
    }
  };

  // ➕ Create a project
  const createProject = async (data) => {
    try {
      const res = await axiosInstance.post(`/v1/project`, data);
      setProjects((prev) => [res.data.project, ...prev]);
      setTrigger((prev) => prev + 1);
      return res.data.project;
    } catch (err) {
      setError("Failed to create project");
      throw err;
    }
  };

  // ✏️ Update a project
  const updateProject = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/v1/project/${id}`, data);
      setProjects((prev) =>
        prev.map((proj) => (proj._id === id ? res.data.project : proj))
      );
      setTrigger((prev) => prev + 1);
      return res.data.project;
    } catch (err) {
      setError("Failed to update project", err);
      throw err;
    }
  };

  // ❌ Delete a project
  const deleteProject = async (id) => {
    try {
      await axiosInstance.delete(`/v1/project/${id}`);
      setProjects((prev) => prev.filter((proj) => proj._id !== id));
    } catch (err) {
      setError("Failed to delete project", err);
    }
  };

  // 📥 Get a single project (optional)
  const getProjectById = async (id) => {
    try {
      const res = await axiosInstance.get(`/v1/project/${id}`);
      setSelectedProject(res.data);
      return res.data;
    } catch (err) {
      setError("Failed to fetch project details", err);
    }
  };

  // 📦 Load on mount
  useEffect(() => {
    fetchProjects();
  }, [trigger]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        selectedProject,
        getProjectById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
