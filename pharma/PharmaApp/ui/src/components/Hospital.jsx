import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/images/images.png";

const Hospital = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center overflow-hidden">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 w-full max-w-4xl px-4">
        {/* Dashboard Header */}
        <div className="text-4xl font-semibold text-gray-800 mb-4 text-center">
          Hospital Dashboard
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {/* Create Order Card */}
          <div className="bg-green-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Create Order</h3>
            <Link to="/create-order" className="w-full">
              <button className="bg-green-700 w-full py-2 px-4 text-center rounded-full hover:bg-green-800 transition duration-200">
                Go to Create
              </button>
            </Link>
          </div>

          {/* View Orders Card */}
          <div className="bg-blue-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">View Orders</h3>
            <Link to="/view-order" className="w-full">
              <button className="bg-blue-700 w-full py-2 px-4 text-center rounded-full hover:bg-blue-800 transition duration-200">
                Go to View
              </button>
            </Link>
          </div>

          {/* Read Orders Card */}
          <div className="bg-yellow-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Read Order</h3>
            <Link to="/read-order" className="w-full">
              <button className="bg-yellow-700 w-full py-2 px-4 text-center rounded-full hover:bg-yellow-800 transition duration-200">
                Go to Read
              </button>
            </Link>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Hospital;
