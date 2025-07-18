import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useProject } from "../Context/ProjectContext";
import { useTask } from "../Context/TaskContext";
import { useAuth } from "../Context/AuthContext";

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Report = () => {
  const { projects } = useProject();
  const { task } = useTask();
  const { getAllUsers } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Prepare data for the pie chart: tasks per project
  const projectCounts = projects.reduce((acc, proj) => {
    acc[proj.name] = 0;
    return acc;
  }, {});
  task.forEach((t) => {
    const proj = projects.find((p) => p._id === t.project);
    if (proj) projectCounts[proj.name]++;
  });
  const pieLabels = Object.keys(projectCounts);
  const pieData = Object.values(projectCounts);

  // Prepare data for bar chart: tasks per status
  const statusList = ["To Do", "In Progress", "Completed", "Blocked"];
  const statusCounts = statusList.map(
    (status) => task.filter((t) => t.status === status).length
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white mb-4">Reports Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Tasks per Project</h2>
          <Pie
            data={{
              labels: pieLabels,
              datasets: [
                {
                  data: pieData,
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                  ].slice(0, pieLabels.length),
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Tasks by Status</h2>
          <Bar
            data={{
              labels: statusList,
              datasets: [
                {
                  label: "Number of Tasks",
                  data: statusCounts,
                  backgroundColor: ["#3490dc", "#f6ad55", "#38c172", "#e3342f"],
                },
              ],
            }}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } },
              },
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>

      {/* List of Users */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">
          Users List ({users.length})
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          {users.map((u) => (
            <li key={u._id || u.id}>
              {u.name} —{" "}
              <span className="text-sm text-gray-500">{u.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
