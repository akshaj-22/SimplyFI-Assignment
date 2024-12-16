import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApproveDrug = () => {
  const [drugId, setDrugId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleApproveCheck = async () => {
    if (!drugId) {
      setMessage('');
      setError('Please enter a valid Drug ID.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/approveDrug/${drugId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message);
        setDrugId('');
        setTimeout(() => navigate('/dva'), 2000);
      } else {
        setError(data.error || 'An error occurred while approving the drug.');
      }
    } catch (error) {
      console.error('Error approving drug:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url("https://www.lingayasvidyapeeth.edu.in/sanmax/wp-content/uploads/2023/05/pharmacy.jpeg")`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Card Content */}
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">Approve Drug</h2>
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            placeholder="Enter Drug ID"
            value={drugId}
            onChange={(e) => setDrugId(e.target.value)}
            className="w-full p-3 border border-blue-300 rounded-lg shadow-sm text-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleApproveCheck}
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } transition duration-300`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Approve Drug'}
          </button>
        </div>
        {message && (
          <p className="mt-4 text-blue-700 font-semibold text-center">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-red-700 font-semibold text-center">{error}</p>
        )}
      </div>
    </section>
  );
};

export default ApproveDrug;
