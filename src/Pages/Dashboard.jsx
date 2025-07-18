import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import AddProjectModal from "../components/AddProjectModel";
import { useProject } from "../Context/ProjectContext";
import { Link } from "react-router-dom";
import axiosInstance from "../components/axiosInstance";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState("All");
  const [taskFilter, setTaskFilter] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const { projects } = useProject();

  const filteredProjects = projects
    ?.filter((proj) =>
      proj.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((proj) =>
      projectFilter === "All" ? true : proj.status === projectFilter
    );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const params = {};
        if (taskFilter !== "All") {
          params.status = taskFilter;
        }
        const res = await axiosInstance.get("/v1/task", {
          params: taskFilter !== "All" ? params : {},
        });

        setFilteredTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [taskFilter]);

  return (
    <div className="p-4">
      {/* 🔍 Search Projects */}
      <div>
        <input
          type="text"
          placeholder="Find the Project"
          className="w-[90%] p-2 bg-gray-50 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 📁 Projects Section */}
      <section>
        <div>
          <div className="flex justify-between items-center mt-5">
            <div className="flex justify-center gap-3">
              <h1 className="font-bold text-gray-100 text-3xl">Project</h1>
              <span className="inline-flex items-center gap-2 text-gray-50 text-sm rounded-md px-2 py-1">
                <label htmlFor="statusFilter" className="text-md">
                  Filter:
                </label>
                <select
                  id="statusFilter"
                  className="bg-transparent focus:outline-none text-sm border rounded-sm p-2 text-gray-500"
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </span>
            </div>
            <button
              className="px-4 py-2 bg-purple-400 rounded-lg text-sm"
              onClick={() => setShowModal(true)}
            >
              Add Project +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects?.map((proj) => (
            <Link key={proj._id} to={`/project/${proj._id}`}>
              <Card
                tag={proj.status}
                heading={proj.name}
                description={proj.description}
                type="project"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ My Task Section with Backend Filter */}
      <section>
        <div>
          <div className="flex justify-between items-center mt-5">
            <div className="flex justify-center gap-3">
              <h1 className="font-bold text-gray-100 text-3xl">My Task</h1>
              <span className="inline-flex items-center gap-2 text-gray-50 text-sm rounded-md px-2 py-1">
                <label htmlFor="taskStatusFilter" className="text-md">
                  Filter:
                </label>
                <select
                  id="taskStatusFilter"
                  className="bg-transparent focus:outline-none text-sm border rounded-sm p-2 text-gray-500"
                  value={taskFilter}
                  onChange={(e) => setTaskFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </span>
            </div>
            <button className="px-4 py-2 bg-purple-400 rounded-lg text-sm">
              Add Task +
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks?.map((task) => (
            <Link key={task._id} to={`/task/${task._id}`}>
              <Card
                tag={task.status}
                heading={task.name}
                type="task"
                owners={task.owners}
              />
            </Link>
          ))}
        </div>
      </section>

      <AddProjectModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Dashboard;
