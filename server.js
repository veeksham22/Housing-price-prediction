const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route to check if the server is running
app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
});

// Prediction route
app.post('/predict', (req, res) => {
    const { location, sqft, bhk, bath } = req.body;

    // Validate request body
    if (!location || !sqft || !bhk || !bath) {
        return res.status(400).json({ error: 'Missing required fields: location, sqft, bhk, or bath' });
    }

    const inputFeatures = { location, sqft, bhk, bath };
    const pythonPath = process.env.PYTHON_PATH; // Path to Python executable
    const predictorPath = path.join(__dirname, 'predictor.py'); // Path to predictor script

    // Spawn Python process
    const pythonProcess = spawn(pythonPath, [predictorPath, JSON.stringify(inputFeatures)]);

    let prediction = '';

    // Capture output from Python script
    pythonProcess.stdout.on('data', (data) => {
        prediction += data.toString();
    });

    // Handle errors in the Python process
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    // Handle Python process completion
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                res.status(200).json({ prediction: JSON.parse(prediction) });
            } catch (error) {
                res.status(500).json({ error: 'Invalid response from predictor script.' });
            }
        } else {
            res.status(500).json({ error: 'Python process exited with error.' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
