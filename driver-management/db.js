const mysql = require('mysql2');

// Create connection to the MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST,    // Replace with your DB host
    user: process.env.DB_USER,         // Replace with your DB user
    password: process.env.DB_PASSWORD,         // Replace with your DB password
    database: process.env.DB_DATABASE  // Replace with your DB name
}).promise();

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL Database.');
    }
});

module.exports = db;
