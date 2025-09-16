import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth/authSlice";
import projectReducer from "../store/features/projects/projectSlice";
import taskReducer from "../store/features/task/taskSlice";
import teamReducer from "../store/features/team/teamSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer,
    teams: teamReducer,
  },
});

export default store;
