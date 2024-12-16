import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ReadOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleReadOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/readOrder/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
        setMessage('');
        setSuccessMessage('Order fetched successfully');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to fetch order.');
      }
    } catch (error) {
      setMessage('An error occurred while fetching the order.');
      console.error(error);
    }
  };

  const resetForm = () => {
    setOrderId('');
    setOrderDetails(null);
    setMessage('');
    setSuccessMessage('');
  };

  return (
    <section
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://www.lingayasvidyapeeth.edu.in/sanmax/wp-content/uploads/2023/05/pharmacy.jpeg")`,
      }}
    >
      <div className="container mx-auto max-w-3xl px-4">
        <div className="bg-white bg-opacity-80 px-6 py-8 shadow-lg rounded-md border">
          <h2 className="text-3xl text-blue-800 text-center font-semibold mb-6">
            Read Order
          </h2>

          <div className="mb-6">
            <label
              htmlFor="orderId"
              className="block text-gray-700 font-bold mb-2"
            >
              Order ID
            </label>
            <input
              type="text"
              id="orderId"
              name="orderId"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>

          <div className="flex justify-between mb-6">
            <button
              onClick={handleReadOrder}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Fetch Order
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Reset
            </button>
          </div>

          {message && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
              <p className="text-red-800 font-medium">{message}</p>
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded">
              <p className="text-blue-800 font-medium">{successMessage}</p>
            </div>
          )}

          {orderDetails && (
            <div className="mt-6">
              <div className="bg-white bg-opacity-90 p-4 rounded shadow-md">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">
                  Order Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  {Object.entries(orderDetails).map(([key, value]) => (
                    <div key={key} className="flex ">
                      <span className="font-medium text-gray-600">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReadOrder;
