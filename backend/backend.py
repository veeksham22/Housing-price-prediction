from flask import Flask, request, jsonify
from predictor import predict_price
from flask_cors import CORS
app = Flask(__name__)
CORS(app)  
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    ans = predict_price(data)
    return jsonify({'price': ans})

if __name__ == '__main__':
   app.run(debug=True)