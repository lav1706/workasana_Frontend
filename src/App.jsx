import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Pages/Dashboard";
import Project from "./Pages/Project";
import Team from "./Pages/Team";
import TeamDetail from "./Pages/TeamDetails";
import Login from "./Pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // 👈 import
import Register from "./Pages/Register";
import AuthProvider from "./Context/AuthContext";
import ProjectProvider from "./Context/ProjectContext";
import ProjectDetail from "./Pages/ProjectDetails";
import TaskProvider from "./Context/TaskContext";
import TeamProvider from "./Context/TeamContext";
import TaskDetail from "./Pages/TaskDetails";
import Report from "./Pages/Report";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <TeamProvider>
            <TaskProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="project" element={<Project />} />
                  <Route path="team" element={<Team />} />
                  <Route path="team/:id" element={<TeamDetail />} />
                  <Route path="project/:id" element={<ProjectDetail />} />
                  <Route path="task/:id" element={<TaskDetail />} />
                  <Route path="report" element={<Report />} />
                </Route>
              </Routes>
            </TaskProvider>
          </TeamProvider>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
