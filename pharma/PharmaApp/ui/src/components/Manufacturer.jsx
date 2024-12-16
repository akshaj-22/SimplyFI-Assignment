import React from 'react';
import { useNavigate } from 'react-router-dom';

const Manufacturer = () => {
  const navigate = useNavigate();

  const handleCreateDrug = () => {
    navigate('/create');
  };

  const handleReadDrug = () => {
    navigate('/read');
  };

  const handleTransferDrug = () => {
    navigate('/transfer');
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 w-full max-w-4xl px-4">
        {/* Dashboard Header */}
        <div className="text-4xl font-semibold text-gray-800 mb-4 text-center">
          Drug Management System
        </div>

        {/* Dashboard Buttons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Create Drug Card */}
          <div className="bg-green-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Create Drug</h3>
            <button
              onClick={handleCreateDrug}
              className="bg-green-700 w-full py-2 px-4 text-center rounded-full hover:bg-green-800 transition duration-200"
            >
              Go to Create
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

          {/* Transfer Drug Card */}
          <div className="bg-yellow-500 text-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4">Transfer Drug</h3>
            <button
              onClick={handleTransferDrug}
              className="bg-yellow-700 w-full py-2 px-4 text-center rounded-full hover:bg-yellow-800 transition duration-200"
            >
              Go to Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manufacturer;
