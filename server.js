const express = require('express');
const app = express();

// Ye line system ko batati hai ki data JSON format mein aayega
app.use(express.json());

// Ye hamara 'Darwaza' (Endpoint) hai jahan Wattmon data bhejega
app.post('/receiver', (req, res) => {
    console.log("Wattmon se data mil gaya!");
    console.log("Data details:", req.body);
    
    // Yahan hum aage scaling ka logic daalenge (val / 10 etc.)
    
    res.send("Data mil gaya, Shukriya!");
});

// Server ko chalu karne ke liye
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Solar Cloud Server Chalu Hai Port: " + PORT);
});
