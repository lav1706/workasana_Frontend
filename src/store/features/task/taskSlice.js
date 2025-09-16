import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../components/axiosInstance";

// 🔃 Fetch all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await axiosInstance.get(`/v1/task?${queryParams}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ➕ Create task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/v1/task", data);
      return res.data.task;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✏️ Update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/v1/task/${id}`, data);
      return res.data.task;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ❌ Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/v1/task/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 📥 Get single task
export const getTaskById = createAsyncThunk(
  "tasks/getTaskById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/v1/task/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    selectedTask: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔃 FETCH
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ CREATE
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })

      // ✏️ UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })

      // ❌ DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })

      // 📥 SINGLE TASK
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
      });
  },
});

export default taskSlice.reducer;
