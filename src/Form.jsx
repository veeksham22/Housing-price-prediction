import React, { useState } from "react";

const Form = () => {
  const [price, setPrice] = useState("");

  const calculatePrice = (e) => {
    e.preventDefault();
    // Placeholder logic for price calculation
    setPrice("Estimated Price: ₹50,00,000");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#89253e] to-[#3a6186] bg-opacity-12 text-white overflow-hidden">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-center items-center flex-grow px-4 md:px-25 overflow-hidden">
        {/* Form Section */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-lg shadow-lg max-w-lg w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-6 text-center">Price Predictor</h1>
          <form className="space-y-6" onSubmit={calculatePrice}>

            
            {/* Area in Square Feet Input */}
            <input
              type="text"
              placeholder="Area in square feet"
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {/* Type of Area Dropdown */}
            <select
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select Type of Area</option>
              <option value="Carpet Area">Carpet Area</option>
              <option value="Built-up Area">Built-up Area</option>
              <option value="Plot Area">Plot Area</option>
              <option value="Super built-up Area">Super built-up Area</option>
            </select>

            {/* Location Dropdown */}
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {/* Availability Dropdown */}
            <select
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Availability</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            {/* BHK Selection */}
            <select
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select BHK</option>
              {[...Array(50)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} BHK
                </option>
              ))}
            </select>

            {/* Bathroom Selection */}
            <select
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select Bathrooms</option>
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Balcony Selection */}
            <select
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select Balcony</option>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>

            {/* Calculate Button */}
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-full transition duration-300"
            >
              Calculate Price
            </button>
          </form>
          {/* Output Display */}
          {price && (
            <div className="mt-6 text-center bg-white bg-opacity-20 py-4 px-6 rounded-md">
              {price}
            </div>
          )}
        </div>

        {/* Illustration Section */}
        <div className="flex md:mt-0 md:ml-0 w-full md:w-1/2 justify-center">
          <img
            src="src/assets/huse.png"
            alt="Price Illustration"
            className="w-80 h-auto md:w-[800px] md:h-[800px] object-contain"
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

export default Form;
