const express = require('express');
const router = express.Router();
const db = require('../db');
const queries = require('../queries/getDriverByEmail.json');

router.get('/driver/:id', (req, res) => {
    const driverId = req.params.id;

    const query = "SELECT * FROM Drivers WHERE driverId = ?"; 
    db.query(query, [driverId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error occurred' });
        }
        
        if (result.length > 0) {
           
            res.status(200).json({ driver: result[0] });
        } else {
           
            res.status(404).json({ message: 'Driver not found' });
        }
    });
});

module.exports = router;
