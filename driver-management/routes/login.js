const express = require('express');
const router = express.Router();
const db = require('../db');
const query = require('../queries/loginQuery.json');

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query(query.checkEmail, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error occurred' });
        }
        console.log('Driver object:', result[0]);
        if (result.length > 0) {
            res.status(200).json({ message: 'Login successful', driverId: result[0].driverId});
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    });
});


module.exports = router;
