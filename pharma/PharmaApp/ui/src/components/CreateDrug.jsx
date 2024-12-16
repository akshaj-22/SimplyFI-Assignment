import React, { useState } from 'react';

const CreateDrug = () => {
  const [drugId, setDrugId] = useState('');
  const [drugName, setDrugName] = useState('');
  const [drugBrand, setDrugBrand] = useState('');
  const [manufacturerName, setManufacturerName] = useState('');
  const [manufacturingDate, setManufacturingDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/createdrug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drugId,
          drugName,
          drugBrand,
          manufacturerName,
          manufacturingDate,
          expiryDate,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Drug created successfully!');
        console.log(data);
      } else {
        setMessage('Failed to create drug. Please check the details.');
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      setMessage('An error occurred while creating the drug.');
      console.error(error);
    }
  };

  return (
    <section
      className="h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url("https://www.lingayasvidyapeeth.edu.in/sanmax/wp-content/uploads/2023/05/pharmacy.jpeg")`,
      }}
    >
      <div className="container mx-auto max-w-4xl px-4">
        <div className="bg-white bg-opacity-80 px-6 py-8 shadow-lg rounded-md border">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-blue-800 text-center font-semibold mb-6">
              Create Drug
            </h2>

            {message && (
              <div
                className={`mb-4 p-3 rounded ${
                  message.includes('success')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Drug ID</label>
              <input
                type="text"
                value={drugId}
                onChange={(e) => setDrugId(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
                placeholder="e.g., Drug-001"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Drug Name</label>
              <input
                type="text"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
                placeholder="e.g., Paracetamol"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Drug Brand</label>
              <input
                type="text"
                value={drugBrand}
                onChange={(e) => setDrugBrand(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
                placeholder="e.g., Amoxil"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Manufacturer</label>
              <input
                type="text"
                value={manufacturerName}
                onChange={(e) => setManufacturerName(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
                placeholder="e.g., ABC Pharma"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Manufacturing Date</label>
              <input
                type="date"
                value={manufacturingDate}
                onChange={(e) => setManufacturingDate(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>

            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create Drug
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateDrug;
