import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login({ email, password });
    } catch (err) {
      setError("Invalid email or password", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-sm w-full space-y-6">
        <h1 className="text-center text-3xl font-bold text-indigo-600">
          workasana
        </h1>
        <h2 className="text-center text-xl font-semibold text-gray-800">
          Log in to your account
        </h2>
        <p className="text-center text-sm text-gray-500">
          Please enter your details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring focus:ring-indigo-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              >
                {show ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Sign in
          </button>

          <p className="flex items-center justify-center text-sm">
            Create a new account?{" "}
            <Link to="/register" className="text-blue-700 ml-1 font-medium">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
