import sys
import json
import pickle
import sklearn

import numpy as np

# Load the pre-trained model
MODEL_FILE = 'C:\\Users\\DELL\\om\\ml_model\\bangalore_home_prices_model.pickle'

try:
    with open(MODEL_FILE, 'rb') as file:
        model = pickle.load(file)
except FileNotFoundError:
    print(json.dumps({"error": f"Model file {MODEL_FILE} not found"}))
    sys.exit(1)

# Load location encoder (if applicable)
# Uncomment and adapt if you have an encoder
# ENCODER_FILE = 'ml_model/location_encoder.pkl'
# try:
#     with open(ENCODER_FILE, 'rb') as file:
#         location_encoder = pickle.load(file)
# except FileNotFoundError:
#     print(json.dumps({"error": f"Encoder file {ENCODER_FILE} not found"}))
#     sys.exit(1)

# Parse input arguments from the command line
if __name__ == '__main__':
    try:
        input_data = json.loads(sys.argv[1])  # Read JSON from backend
    except (IndexError, json.JSONDecodeError):
        print(json.dumps({"error": "Invalid input format"}))
        sys.exit(1)

    # Extract input features
    type_of_area= input_data.get('type_of_area')
    location = input_data.get('location')
    availability=input_data.get('availability')
    sqft = input_data.get('sqft')
    bath = input_data.get('bath')
    balcony=input_data.get('balcony')
    bhk = input_data.get('bhk')
    

    # Validate inputs
    if not location or not sqft or not bhk or not bath:
        print(json.dumps({"error": "Missing one or more required fields"}))
        sys.exit(1)

    try:
        # Prepare the input features for prediction
        input_features = np.array([[type_of_area,location,availability, sqft,bath,balcony,bhk]])

        # Example: Encode location (if your model requires encoding)
        # location_encoded = location_encoder.transform([location])[0]
        # input_features = np.array([[location_encoded, sqft, bhk, bath]])

        # Make the prediction
        predicted_price = model.predict(input_features)[0]

        # Return the prediction as JSON
        print(json.dumps({"predicted_price": predicted_price}))

    except Exception as e:
        print(json.dumps({"error": f"Prediction failed: {str(e)}"}))
        sys.exit(1)
