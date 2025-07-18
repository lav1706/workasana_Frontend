import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

const TeamContext = createContext();
export const useTeam = () => useContext(TeamContext);

const TeamProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState([]);
  const [error, setError] = useState("");
  const [selectTeam, setSelectedTeam] = useState();
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/v1/team");
        setTeam(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [trigger]);

  const createTeam = async (data) => {
    try {
      const res = await axiosInstance.post("/v1/team", data);
      setTeam((prev) => [res.data.team, ...prev]);
      return res.data.team;
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
      throw err;
    }
  };

  const updateTeam = async (id, data) => {
    try {
      const res = await axiosInstance.put(`/v1/team/${id}`, data);
      setTeam((prev) =>
        prev.map((team) => (team._id === id ? res.data.team : team))
      );
      setTrigger((prev) => prev + 1);
      return res.data.team;
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
      throw err;
    }
  };

  const deleteTeam = async (id) => {
    try {
      await axiosInstance.delete(`/v1/team/${id}`);
      setTeam((prev) => prev.filter((team) => team._id !== id));
      setTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  const getTeamById = async (id) => {
    try {
      const res = await axiosInstance.get(`/v1/team/${id}`);
      setSelectedTeam(res.data.team);
      setTrigger((prev) => prev + 1);
      return res.data.team;
    } catch (err) {
      console.error(err);
      setError("Failed to fetch task details");
    }
  };
  const addMemberToTeam = async (teamId, userId) => {
    try {
      const res = await axiosInstance.post(`/v1/team/${teamId}/member`, {
        userId,
      });

      setTeam((prev) =>
        prev.map((t) => (t._id === teamId ? res.data.team : t))
      );

      if (selectTeam?._id === teamId) {
        setSelectedTeam(res.data.team);
      }

      return res.data.team;
    } catch (err) {
      console.error("Failed to add member:", err);
      throw err;
    }
  };

  const removeMemberToTeam = async (teamId, userId) => {
    try {
      const res = await axiosInstance.delete(`/v1/team/${teamId}/member`, {
        data: { userId }, // ✅ fix method: delete with body
      });

      setTeam((prev) =>
        prev.map((t) => (t._id === teamId ? res.data.team : t))
      );

      if (selectTeam?._id === teamId) {
        setSelectedTeam(res.data.team);
      }

      return res.data.team;
    } catch (error) {
      console.error("Failed to remove member:", error);
      throw error;
    }
  };

  return (
    <TeamContext.Provider
      value={{
        createTeam,
        updateTeam,
        deleteTeam,
        selectTeam,
        getTeamById,
        error,
        loading,
        team,
        addMemberToTeam,
        removeMemberToTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export default TeamProvider;
