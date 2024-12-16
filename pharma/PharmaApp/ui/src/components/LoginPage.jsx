import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img from "../assets/images/images.png";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || "manufacturer";

  const [username, setUsername] = useState("");
  const [passphrase, setPassphrase] = useState("");

  // Predefined user data
  const predefinedUsers = {
    manufacturer: { username: "manufacturerUser", passphrase: "manufacturerPass" },
    distributor: { username: "distributorUser", passphrase: "distributorPass" },
    market: { username: "marketUser", passphrase: "marketPass" },
    wholesaler: { username: "wholesalerUser", passphrase: "wholesalerPass" },
  };

  const loginSubmit = (e) => {
    e.preventDefault();
  
    // Validate the user credentials
    const user = predefinedUsers[userType];
    if (user && user.username === username && user.passphrase === passphrase) {
      toast.success(`Logged in as: ${userType}`);
      
      // Redirect based on userType
      if (userType === "manufacturer") {
        navigate("/manufacturer");
      } else if (userType === "distributor") {
        navigate("/distributor");
      } else if (userType === "market") {
        navigate("/market");
      } else if (userType === "wholesaler") {
        navigate("/wholesaler");
      }
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mx-4">
        {/* Left Side - Illustration */}
        <div className="flex justify-center mb-6">
          <img src={img} alt="Illustration" className="w-24 h-24" />
        </div>

        {/* Heading and Description */}
        <h1 className="text-3xl font-bold text-center text-green-600 mb-2">AgriChain</h1>
        <p className="text-gray-500 text-center mb-8">
          "Empowering transparent and efficient agriculture supply chains with blockchain technology."
        </p>

        {/* Login Form */}
        <form onSubmit={loginSubmit} className="space-y-5">
          <h2 className="text-xl font-semibold text-gray-800 text-center">Welcome, {userType}</h2>

          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              id="passphrase"
              name="passphrase"
              placeholder="Passphrase"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg w-full hover:bg-green-600 transition duration-300"
          >
            Sign In
          </button>

          <a href="/signup" className="text-center text-gray-500 text-md mt-4">
            Are you New here? Sign Up
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
