import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current location is the landing page
  const isLandingPage = location.pathname === '/';

  return (
    <div
      className="fixed top-10 left-10 flex flex-col items-start z-50"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        disabled={isLandingPage} // Disable the button on the landing page
        className={`px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 mb-2 ${
          isLandingPage
            ? 'bg-gray-500 cursor-not-allowed' // Muted color for the disabled state
            : 'bg-[#005a8c] hover:bg-[#004b73]' // Complementary color for active state
        }`}
      >
        Back
      </button>

      {/* Home Button */}
      <button
        onClick={() => navigate('/')} // Navigate to the landing page
        className="px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 bg-[#3b9f3b] hover:bg-[#2d7b2d]"
      >
        Home
      </button>
    </div>
  );
};

export default NavigationButtons;
