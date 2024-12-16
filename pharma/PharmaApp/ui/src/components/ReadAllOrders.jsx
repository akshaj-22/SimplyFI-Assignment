import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const QueryAllOrders = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await fetch("/api/queryAllOrders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        if (result.success) {
          setOrderData(result.data.value); // Access the "value" array directly
          toast.success("Drug data retrieved successfully");
        } else {
          toast.error("No drug data found");
        }
      } catch (error) {
        toast.error("An error occurred while fetching the drug data");
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-lg max-w-6xl w-full p-8">
        <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center">
          All Orders
        </h2>

        {/* Display drug data in a table format if data is available */}
        {orderData && orderData.length > 0 ? (
          <div className="overflow-x-auto bg-blue-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">
              Order Data
            </h3>
            <table className="min-w-full border-collapse border border-blue-300">
              <thead>
                <tr className="bg-blue-200 text-blue-800">
                  <th className="px-6 py-3 border border-blue-300 text-left">Order ID</th>
                  <th className="px-6 py-3 border border-blue-300 text-left">Drug Name</th>
                  <th className="px-6 py-3 border border-blue-300 text-left">Drug Brand</th>
                  <th className="px-6 py-3 border border-blue-300 text-left">Hospital Name</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-blue-100" : "bg-white"
                    } hover:bg-blue-50 transition duration-200`}
                  >
                    <td className="px-6 py-3 border border-blue-300">{order.Key}</td>
                    <td className="px-6 py-3 border border-blue-300">{order.Record.drugName}</td>
                    <td className="px-6 py-3 border border-blue-300">{order.Record.drugBrand}</td>
                    <td className="px-6 py-3 border border-blue-300">{order.Record.hospitalName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 p-6 bg-red-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-red-700 mb-4">
              No Order Data Found
            </h3>
            <p className="text-gray-600">
              There is no order data available at the moment. Please try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryAllOrders;
