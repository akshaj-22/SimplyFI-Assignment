import React, { useState } from 'react';

const ReadDrug = () => {
  const [drugId, setDrugId] = useState('');
  const [drugData, setDrugData] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!drugId) {
      setMessage('Please enter a valid Drug ID.');
      setDrugData(null);
      return;
    }

    try {
      // Fetch drug data from backend
      const response = await fetch(`http://localhost:5000/readdrug`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drugId }), // Send drugId in request body
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setDrugData(data.data.value); // Set the drug data if the response is successful
          setMessage('');
        } else {
          setMessage('Drug not found. Please check the Drug ID.');
          setDrugData(null);
        }
      } else {
        setMessage('Drug not found. Please check the Drug ID.');
        setDrugData(null);
      }
    } catch (error) {
      console.error('Error fetching drug data:', error);
      setMessage('An error occurred. Please try again later.');
      setDrugData(null);
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-cover bg-center" 
      style={{
        backgroundImage: `url("https://www.lingayasvidyapeeth.edu.in/sanmax/wp-content/uploads/2023/05/pharmacy.jpeg")`,
      }}
    >
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white bg-opacity-80 px-6 py-8 shadow-lg rounded-md border">
          <h2 className="text-3xl text-blue-800 text-center font-semibold mb-6">Search Drug Information</h2>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Enter Drug ID"
              value={drugId}
              onChange={(e) => setDrugId(e.target.value)}
              className="border rounded-l w-2/3 py-2 px-3 text-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
            >
              Search
            </button>
          </div>
          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('not') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
              {message}
            </div>
          )}
          {drugData && (
            <div className="bg-gray-100 p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Drug Details</h3>
              <p className="mb-2"><strong>Drug ID:</strong> {drugData.drugId}</p>
              <p className="mb-2"><strong>Name:</strong> {drugData.drugName}</p>
              <p className="mb-2"><strong>Brand:</strong> {drugData.drugBrand}</p>
              <p className="mb-2"><strong>Manufacturing Date:</strong> {drugData.manufacturingDate}</p>
              <p className="mb-2"><strong>Expiry Date:</strong> {drugData.expiryDate}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReadDrug;
