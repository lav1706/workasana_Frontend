import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // LOGIN
  const login = async ({ email, password }) => {
    try {
      const res = await axiosInstance.post("/v1/user/login", {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
      return { token, user };
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  // REGISTER
  const register = async ({ name, email, password }) => {
    try {
      const res = await axiosInstance.post("/v1/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
      return { token, user };
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    }
  };

  // LOGOUT
  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // GET ALL USERS (FIXED)
  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get("/v1/user");
      return res.data;
    } catch (err) {
      console.error("Failed to fetch users:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, getAllUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
