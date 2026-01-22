const express = require('express');
const multer = require('multer'); // File handle karne ke liye
const upload = multer();
const app = express();

// SCALING RULES (Wahi purane wale)
const scalingRules = {
    "_1": 10,   // Example: Volts ko 10 se divide karna h
    "_2": 100,  // Example: Current ko 100 se divide karna h
    "_3": 1     // No scaling
};

app.post('/receiver', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('File nahi mili bhai!');
    }

    // CSV File ko text mein badalna
    const csvData = req.file.buffer.toString();
    console.log("Original CSV Data:\n", csvData);

    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const values = lines[1].split(',');

    let finalData = {};

    // CSV ke har column ko check karke scale karna
    headers.forEach((header, index) => {
        let cleanHeader = header.trim();
        let rawValue = parseFloat(values[index]);

        if (scalingRules[cleanHeader]) {
            finalData[cleanHeader] = rawValue / scalingRules[cleanHeader];
        } else {
            finalData[cleanHeader] = rawValue;
        }
    });

    console.log("Processed (Scaled) Data:", finalData);
    res.send("CSV Processed and Scaled!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("CSV Server Live!"));
