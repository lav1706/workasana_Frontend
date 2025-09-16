import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../components/axiosInstance";

// 🔃 Fetch all projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/v1/project");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ➕ Create project
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/v1/project", data);
      return res.data.project;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✏️ Update project
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/v1/project/${id}`, data);
      return res.data.project;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ❌ Delete project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/v1/project/${id}`);
      return id; // deleted project ka id return karega
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 📥 Get single project
export const getProjectById = createAsyncThunk(
  "projects/getProjectById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/v1/project/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    selectedProject: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔃 Fetch all
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ Create
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })

      // ✏️ Update
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((proj) =>
          proj._id === action.payload._id ? action.payload : proj
        );
      })

      // ❌ Delete
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (proj) => proj._id !== action.payload
        );
      })

      // 📥 Get single
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.selectedProject = action.payload;
      });
  },
});

export default projectSlice.reducer;
