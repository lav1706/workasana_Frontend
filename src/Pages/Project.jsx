import React, { useEffect } from "react";
import { useState } from "react";
import { CiFlag1 } from "react-icons/ci";
import AddTaskModal from "../components/AddTaskModel";
import Avatar from "../components/Avatar";
import { useTask } from "../Context/TaskContext";

// Function to get consistent background color for a name

const badgeColors = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-purple-100 text-purple-600",
  Low: "bg-blue-100 text-blue-600",
};

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  "Not Started": "bg-blue-100 text-blue-700",
};

const Project = () => {
  const [showModal, setShowModal] = useState(false);
  const { task } = useTask();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortType, setSortType] = useState("");
  console.log(task);

  useEffect(() => {
    let sortedTasks = [...task];

    if (sortType === "low-high") {
      sortedTasks.sort(
        (a, b) => priorityValue(a.priority) - priorityValue(b.priority)
      );
    } else if (sortType === "high-low") {
      sortedTasks.sort(
        (a, b) => priorityValue(b.priority) - priorityValue(a.priority)
      );
    } else if (sortType === "newest") {
      sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "oldest") {
      sortedTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredTasks(sortedTasks);
  }, [task, sortType]);
  const priorityValue = (priority) => {
    if (priority === "High") return 3;
    if (priority === "Medium") return 2;
    return 1;
  };

  return (
    <div className="p-6 ">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-50">Create Moodboard</h2>
        <p className=" mt-1 max-w-3xl text-gray-50">
          This project centers around compiling a digital moodboard to set the
          visual direction and tone for a new brand identity. The moodboard will
          showcase a curated selection of images, color palettes, typography
          samples, textures, and layout inspirations.
        </p>
      </div>

      {/* Sort and Filter */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2 text-gray-50">
        <div className="flex gap-2">
          <button className="btn-sort" onClick={() => setSortType("low-high")}>
            Priority Low–High
          </button>
          <button className="btn-sort" onClick={() => setSortType("high-low")}>
            Priority High–Low
          </button>
          <button className="btn-sort" onClick={() => setSortType("newest")}>
            Newest First
          </button>
          <button className="btn-sort" onClick={() => setSortType("oldest")}>
            Oldest First
          </button>
        </div>
        <div className="flex gap-2">
          <button className="btn-sort">Filter</button>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-600"
            onClick={() => setShowModal(true)}
          >
            + New Task
          </button>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-auto rounded-md border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">TASKS</th>
              <th className="p-3">OWNER</th>
              <th className="p-3">PRIORITY</th>
              <th className="p-3">DUE ON</th>
              <th className="p-3">STATUS</th>
              <th className="p-3 text-center">→</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{task.name}</td>
                <td className="p-3 flex gap-1">
                  {task.owners.map((o, i) => (
                    <span
                      key={o._id || i}
                      title={o.name}
                      className="w-7 h-7 flex items-center justify-center rounded-full text-white text-xs font-semibold bg-orange-300 hover:z-10"
                      style={{
                        transform: `translateX(-${i * 10}px)`,
                        zIndex: task.owners.length - i,
                      }}
                    >
                      <Avatar name={o.name} />
                    </span>
                  ))}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium flex w-fit gap-1 ${
                      badgeColors[task.priority]
                    }`}
                  >
                    <CiFlag1 /> {task.priority}
                  </span>
                </td>
                <td className="p-3">{task.timeToComplete}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      statusColors[task.status]
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="p-3 text-center text-lg">→</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddTaskModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Project;
