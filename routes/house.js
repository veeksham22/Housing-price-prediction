const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const router = express.Router();

// POST route for making predictions
router.post('/predict', (req, res) => {
    const { location, sqft, bhk, bath } = req.body;

    // Validate the input data
    if (!location || !sqft || !bhk || !bath) {
        return res.status(400).json({ error: 'Missing required fields: location, sqft, bhk, or bath' });
    }

    const inputFeatures = { location, sqft, bhk, bath };

    // Spawn a Python process
    const pythonProcess = spawn('python', [
        path.join(__dirname, '../ml_model/predictor.py'),
        JSON.stringify(inputFeatures)
    ]);

    let prediction = '';
    let errorOutput = '';

    // Listen for data from the Python process
    pythonProcess.stdout.on('data', (data) => {
        prediction += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                const result = JSON.parse(prediction);
                if (result.error) {
                    res.status(500).json({ error: result.error });
                } else {
                    res.status(200).json(result);
                }
            } catch (err) {
                res.status(500).json({ error: 'Invalid response from Python script' });
            }
        } else {
            console.error(`Python process exited with code ${code}: ${errorOutput}`);
            res.status(500).json({ error: 'Failed to process prediction. Check Python script for issues.' });
        }
    });
});

module.exports = router;
