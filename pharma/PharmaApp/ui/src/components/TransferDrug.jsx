import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TransferDrug = () => {
  const [drugId, setDrugId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTransfer = async () => {
    if (!drugId) {
      setMessage('');
      setError('Please enter a valid Drug ID.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      // API call to transfer drug
      const response = await fetch(`http://localhost:5000/transferDrug`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drugId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage(data.message); // Display success message
        setDrugId(''); // Clear input field
        setTimeout(() => navigate('/dva'), 2000); // Redirect after 2 seconds
      } else {
        setError(data.message || 'An error occurred while transferring the drug.');
      }
    } catch (error) {
      console.error('Error transferring drug:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false); // Hide loading indicator
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

      {/* Content */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Transfer Drug
        </h2>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter Drug ID"
            value={drugId}
            onChange={(e) => setDrugId(e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
          />
          <button
            onClick={handleTransfer}
            disabled={isLoading}
            className={`p-4 font-semibold text-white rounded-lg ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
            } transition duration-300`}
          >
            {isLoading ? 'Processing...' : 'Transfer Drug'}
          </button>
        </div>
        {message && (
          <p className="text-green-600 font-medium mt-4 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-600 font-medium mt-4 text-center">{error}</p>
        )}
      </div>
    </section>
  );
};

export default TransferDrug;
