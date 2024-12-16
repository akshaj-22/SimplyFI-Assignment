import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dva = () => {
  const navigate = useNavigate();

  const handleReadAllDrug = () => {
    navigate('/read-all');
  };

  const handleReadDrug = () => {
    navigate('/read');
  };

  const handleApproveDrug = () => {
    navigate('/approve');
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 w-full max-w-4xl px-4">
        {/* Dashboard Header */}
        <div className="text-4xl font-semibold text-gray-800 mb-4 text-center">
          Drug Management System - DVA
        </div>

        {/* Dashboard Buttons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Read All Drugs Card */}
          <div className="bg-green-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Read All Drugs</h3>
            <button
              onClick={handleReadAllDrug}
              className="bg-green-700 w-full py-2 px-4 text-center rounded-full hover:bg-green-800 transition duration-200"
            >
              Go to Read All
            </button>
          </div>

          {/* Read Drug Card */}
          <div className="bg-blue-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Read Drug</h3>
            <button
              onClick={handleReadDrug}
              className="bg-blue-700 w-full py-2 px-4 text-center rounded-full hover:bg-blue-800 transition duration-200"
            >
              Go to Read
            </button>
          </div>

          {/* Approve Drug Card */}
          <div className="bg-yellow-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Approve Drug</h3>
            <button
              onClick={handleApproveDrug}
              className="bg-yellow-700 w-full py-2 px-4 text-center rounded-full hover:bg-yellow-800 transition duration-200"
            >
              Go to Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dva;
