import React, { useState } from "react";
import { toast } from "react-toastify";
import img from "../assets/images/images.png";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [confirmPassphrase, setConfirmPassphrase] = useState("");

  const signupSubmit = async (e) => {
    e.preventDefault();

    if (passphrase !== confirmPassphrase) {
      toast.error("Passphrases do not match!");
      return;
    }

    const signupDetails = { username, email, passphrase };

    try {
        const res = await fetch("http://localhost:5000/signup", {


        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupDetails),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success(`Account created! Welcome, ${data.username}`);
      } else {
        toast.error("Signup failed. Please check your details.");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
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

        {/* Signup Form */}
        <form onSubmit={signupSubmit} className="space-y-5">
          <h2 className="text-xl font-semibold text-gray-800 text-center">Create Your Account</h2>

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
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div>
            <input
              type="password"
              id="confirmPassphrase"
              name="confirmPassphrase"
              placeholder="Confirm Passphrase"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={confirmPassphrase}
              onChange={(e) => setConfirmPassphrase(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-lg w-full hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>

          <a href="/login" className="text-center text-gray-500 text-md mt-4 ">
            Already have an account? Login
          </a>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
