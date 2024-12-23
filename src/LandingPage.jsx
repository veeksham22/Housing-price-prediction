import React, { useState } from "react";
import Form from "./Form";

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState("landing");

  const handleExploreClick = () => {
    setCurrentPage("form");
  };

  const handleHomeClick = () => {
    setCurrentPage("landing");
  };

  if (currentPage === "form") {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#89253e] to-[#3a6186] bg-opacity-12 text-white">
        <nav className="flex justify-between items-center p-4 bg-opacity-50 bg-black text-white">
          <button className="bg-pink-600 hover:bg-pink-700 text-white py-1 px-8 rounded">
            Sign In
          </button>
          <div className="flex flex-col items-center">
          <img src="src\assets\lohooo-removebg-preview.png" alt="Logo" className="h-10 w-10" />
          <span className="ml-3text-lg font-bold">House Hunters</span>
        </div>
          <ul className="flex space-x-4">
            <li
              onClick={handleHomeClick}
              className="hover:underline cursor-pointer"
            >
              Home
            </li>
            <li className="hover:underline cursor-pointer">Features</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
        </nav>
        <Form />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#89253e] to-[#3a6186] bg-opacity-12 text-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-4 bg-opacity-50 bg-black">
        <button className="bg-pink-600 hover:bg-pink-700 text-white py-1 px-4 rounded">
          Sign In
        </button>
        <div className="flex flex-col items-center">
          <img src="src\assets\lohooo-removebg-preview.png" alt="Logo" className="h-10 w-10" />
          <span className="ml-3text-lg font-bold">House Hunters</span>
        </div>
        <ul className="flex space-x-4">
          <li className="hover:underline cursor-pointer">Home</li>
          <li className="hover:underline cursor-pointer">Features</li>
          <li className="hover:underline cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center items-center flex-grow px-4 md:px-25">
        {/* First Div: Vertical Title */}
        
        {/* Second Div: Info and Button */}
        <div className="text-center md:text-left md:mx-20 max-w-lg">
          <h2 className="text-4xl md:text-7xl font-extrabold mb-4">
            Housing Price Predictor
          </h2>
          <p className="text-lg md:text-2xl mb-6">
            Housing price prediction in Bangalore is an intriguing and valuable
            endeavor, especially given the city's rapid urbanization and its
            emergence as a major tech hub in India.
          </p>
          <button
            onClick={handleExploreClick}
            className="bg-pink-600 hover:bg-pink-700 text-white py-3 px-8 text-xl rounded-full transition duration-300"
          >
            Explore More
          </button>
        </div>

        {/* Third Div: Image */}
        <div className="mt-10 md:mt-0">
          <img
            src="src/assets/realtor.png"
            alt="Housing Illustration"
            className="w-[600px] md:w-[600px]"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 text-center text-sm py-4">
        <p>© 2024 House Hunters. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
