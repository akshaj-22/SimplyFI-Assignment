import React from 'react';
import { useNavigate } from 'react-router-dom';

const Distributor = () => {
  const navigate = useNavigate();

  const handleReadAllDrug = () => {
    navigate('/read-all');
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className=" p-8 rounded-lg  w-full max-w-md">
        {/* Dashboard Header */}
        <div className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Drug Management System - Distributor
        </div>

        {/* Card */}
        <div className="bg-green-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4">Read All Drugs</h3>
          <button
            onClick={handleReadAllDrug}
            className="bg-green-700 w-full py-2 px-4 text-center rounded-full hover:bg-green-800 transition duration-200"
          >
            Go to Read All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Distributor;
