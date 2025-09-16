// src/store/features/team/teamSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../components/axiosInstance";

// Async Thunks for API calls

export const fetchTeams = createAsyncThunk(
  "team/fetchTeams",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/v1/team");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/v1/team", data);
      return response.data.team;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/v1/team/${id}`, data);
      return response.data.team;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/v1/team/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getTeamById = createAsyncThunk(
  "team/getTeamById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/v1/team/${id}`);
      return response.data.team;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addMemberToTeam = createAsyncThunk(
  "team/addMemberToTeam",
  async ({ teamId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/v1/team/${teamId}/member`, {
        userId,
      });
      return response.data.team;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeMemberFromTeam = createAsyncThunk(
  "team/removeMemberFromTeam",
  async ({ teamId, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/v1/team/${teamId}/member`, {
        data: { userId },
      });
      return response.data.team;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    loading: false,
    team: [],
    selectedTeam: null,
    error: null,
  },
  reducers: {
    clearSelectedTeam(state) {
      state.selectedTeam = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTeams
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch teams";
      })

      // createTeam
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team.unshift(action.payload);
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create team";
      })

      // updateTeam
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = state.team.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
        if (state.selectedTeam?._id === action.payload._id) {
          state.selectedTeam = action.payload;
        }
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update team";
      })

      // deleteTeam
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = state.team.filter((t) => t._id !== action.payload);
        if (state.selectedTeam?._id === action.payload) {
          state.selectedTeam = null;
        }
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete team";
      })

      // getTeamById
      .addCase(getTeamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTeam = action.payload;
      })
      .addCase(getTeamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch team details";
      })

      // addMemberToTeam
      .addCase(addMemberToTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMemberToTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = state.team.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
        if (state.selectedTeam?._id === action.payload._id) {
          state.selectedTeam = action.payload;
        }
      })
      .addCase(addMemberToTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add member to team";
      })

      // removeMemberFromTeam
      .addCase(removeMemberFromTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMemberFromTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = state.team.map((t) =>
          t._id === action.payload._id ? action.payload : t
        );
        if (state.selectedTeam?._id === action.payload._id) {
          state.selectedTeam = action.payload;
        }
      })
      .addCase(removeMemberFromTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove member from team";
      });
  },
});

export const { clearSelectedTeam, clearError } = teamSlice.actions;

export default teamSlice.reducer;
