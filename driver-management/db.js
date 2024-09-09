const mysql = require('mysql2');

// Create connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',    // Replace with your DB host
    user: 'root',         // Replace with your DB user
    password: 'Reddy',         // Replace with your DB password
    database: 'DriverDB'  // Replace with your DB name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL Database.');
    }
});

module.exports = db;
