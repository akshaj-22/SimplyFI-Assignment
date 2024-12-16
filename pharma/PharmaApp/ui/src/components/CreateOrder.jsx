import React, { useState } from 'react';

const CreateOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [drugName, setDrugName] = useState('');
  const [drugBrand, setDrugBrand] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/createorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          drugName,
          drugBrand,
          hospitalName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to create order.');
      }
    } catch (error) {
      setMessage('An error occurred while creating the order.');
      console.error(error);
    }
  };

  return (
    <>
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
                Create Order
              </h2>

              {message && (
                <div
                  className={`mb-4 p-3 rounded ${
                    message.includes('success')
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Order ID</label>
                <input
                  drugName="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Order-01"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Drug Name</label>
                <input
                  drugName="text"
                  value={drugName}
                  onChange={(e) => setDrugName(e.target.value)}
                  required
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Paracetamol"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Drug Brand</label>
                <input
                  drugName="number"
                  value={drugBrand}
                  onChange={(e) => setDrugBrand(e.target.value)}
                  required
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. Amoxil"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Hospital Name</label>
                <input
                  drugName="number"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  required
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="eg. ABC Hospital"
                />
              </div>

              

              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  drugName="submit"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreateOrder;
