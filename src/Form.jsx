import React, { useState } from "react";

// Asynchronous function to get the predicted price
async function getPredictedPrice(formData) {
  const url = "http://127.0.0.1:5000/predict"; // Update the API endpoint
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Predicted Price:", data.price, "Lakhs");
    return data.price;
  } catch (error) {
    console.error("Error fetching predicted price:", error);
    return "Error fetching price";
  }
}

const Form = () => {
  // State variables for form inputs
  const [formData, setFormData] = useState({
    area_type: "",
    location: "",
    availability: "",
    total_sqft: "",
    bath: "",
    balcony: "",
    BHK: "",
  });

  const [price, setPrice] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to calculate the price and update the state
  const calculatePrice = async (e) => {
    e.preventDefault();
    const predictedPrice = await getPredictedPrice(formData);
    if (predictedPrice) {
      setPrice(predictedPrice.toFixed(2)); // Limit to 2 decimal places
    }
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
              name="total_sqft"
              value={formData.total_sqft}
              onChange={handleChange}
              placeholder="Area in square feet"
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />

            {/* Type of Area Dropdown */}
            <select
              name="area_type"
              value={formData.area_type}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            >
              <option value="">Select Type of Area</option>
              <option value="Carpet  Area">Carpet Area</option>
              <option value="Built-up  Area">Built-up Area</option>
              <option value="Plot  Area">Plot Area</option>
              <option value="Super built-up  Area">Super built-up Area</option>
            </select>

            {/* Location Input */}
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />

            {/* Availability Dropdown */}
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            >
              <option value="">Availability</option>
              <option value="Ready To Move">Ready To Move</option>
              <option value="Under Construction">Under Construction</option>
            </select>

            {/* BHK Selection */}
            <input
              type="number"
              name="BHK"
              value={formData.BHK}
              onChange={handleChange}
              placeholder="Number of BHKs"
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />

            {/* Bathroom Selection */}
            <input
              type="number"
              name="bath"
              value={formData.bath}
              onChange={handleChange}
              placeholder="Number of Bathrooms"
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />

            {/* Balcony Selection */}
            <input
              type="number"
              name="balcony"
              value={formData.balcony}
              onChange={handleChange}
              placeholder="Number of Balconies"
              className="w-full px-4 py-3 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />

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
              <h2 className="text-lg font-semibold">Predicted Price:</h2>
              <p>{price} Lakhs</p>
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
