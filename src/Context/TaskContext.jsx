import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");
  const [selectTask, setSelectedTask] = useState();

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/v1/task");
        setTask(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  const createTask = async (data) => {
    try {
      const res = await axiosInstance.post("/v1/task", data);
      setTask((prev) => [res.data.task, ...prev]);
      return res.data.task;
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
      throw err;
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/v1/task/${id}`, data);
      setTask((prev) =>
        prev.map((task) => (task._id === id ? res.data.task : task))
      );
      return res.data.task;
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/v1/task/${id}`);
      setTask((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  const getTaskById = async (id) => {
    try {
      const res = await axiosInstance.get(`/v1/task/${id}`);
      setSelectedTask(res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      setError("Failed to fetch task details");
    }
  };
  const fetchTasks = async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axiosInstance.get(`/v1/task?${queryParams}`);
      setTask(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks with filters:", err);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        createTask,
        updateTask,
        deleteTask,
        selectTask,
        getTaskById,
        error,
        loading,
        task,
        fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
