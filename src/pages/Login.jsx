import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}auth/login`,
        credentials,
        { withCredentials: true }
      );

      console.log(response.data);
      toast.success("Login Successful! 🚀", { position: "top-right" });

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
      toast.error(err.response?.data?.message || "Login failed. Try again.", { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <ToastContainer /> {/* Toast Notification Container */}
      
      {/* Left Side - Image */}
      <div className="hidden md:flex w-full md:w-1/2 bg-gray-200">
        <img
          src="https://img.freepik.com/free-photo/3d-illustration-computer-monitor-login-screen_107791-16390.jpg"
          alt="Admin Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Super Admin Login</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Username"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
