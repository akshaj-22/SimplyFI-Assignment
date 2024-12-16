import React, { useState } from 'react';
import logo from '../assets/images/logo.jpg';
import img1 from '../assets/images/img2.png';
import background from '../assets/images/background.jpg';
import manufacturerImg from '../assets/images/images1.png';
import distributorImg from '../assets/images/images1.png';
import wholesalerImg from '../assets/images/images1.png';
import marketImg from '../assets/images/images1.png';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const handleRoleClick = (role) => {
    navigate('/login', { state: { userType: role } });
  };

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-md">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Agrichain Logo" className="h-20" />
          <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
            PHARMACHAIN
          </h1>
        </div>
        {/*  */}
        <div className="space-x-4">
          <button
            onClick={openLoginModal}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded transition duration-300"
          >
            Login
          </button>
          
        </div>
      </header>

      {/* Hero Section */}
      <main
  className="relative py-20 bg-gray-50"
  style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:space-x-10">
          <div className="md:w-1/2 text-left">
            <h2 className="text-5xl font-bold text-gray-800 leading-tight mb-4">
              Blockchain <span className="text-blue-600">Pharmaceutical Supply Chain</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
            A robust pharmaceutical supply chain management software designed to empower pharmaceutical companies in building a sustainable and efficient supply chain. It offers advanced features like medicine sourcing management, contract manufacturing, and distributor management to streamline operations and ensure compliance with industry standards.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-1/2">
            <img src={img1} alt="Dashboard Mockup" className="w-full rounded" />
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Choose Your Role</h2>
              <button onClick={closeLoginModal} className="text-gray-600 hover:text-gray-800">
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="text-center cursor-pointer"
                onClick={() => navigate("/manufacturer")}
              >
                <img src={manufacturerImg} alt="Manufacturer" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Manufacturer</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => navigate("/distributor")}
              >
                <img src={distributorImg} alt="Distributor" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Distributor</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => navigate("dva")}
              >
                <img src={wholesalerImg} alt="DVA" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">DVA</p>
              </div>
              <div
                className="text-center cursor-pointer"
                onClick={() => navigate("hospital")}
              >
                <img src={marketImg} alt="Hospital" className="h-24 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Hospital</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
