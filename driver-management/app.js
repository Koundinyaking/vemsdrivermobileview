const express = require('express');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');
const cors = require('cors');  // Import CORS
const getDriverByIdRoute = require('./routes/getDriverById');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS


// Routes
app.use('/api', loginRoute);
app.use('/api', getDriverByIdRoute);
// Start server
const PORT = 5000;  // Changed port from 3000 to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
