const express = require('express');
const router = express.Router();
const db = require('../db');
const queries = require('../queries/getDriverByEmail.json');

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM Drivers WHERE email = ? "; // Assuming passwords are stored in plaintext (not recommended in production)
    db.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error occurred' });
        }
        
        if (result.length > 0) {
            res.status(200).json({ message: 'Login successful', driver: result[0] });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});

module.exports = router;
