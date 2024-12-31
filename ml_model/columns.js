const columns = {
    requiredFeatures: ["location", "sqft", "bhk", "bath"], // Features required for prediction
    // Optional: If you handle one-hot encoding of locations in the backend
    locations: ["Whitefield", "Indiranagar", "Koramangala", "Marathahalli"], // Add all unique locations from the dataset
  };
  
  module.exports = columns;
  