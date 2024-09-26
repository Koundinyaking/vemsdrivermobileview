const express = require('express');
const bodyParser = require('body-parser');
const driverRoutes = require('./routes/driverRoutes')
const cors = require('cors'); 
require('dotenv').config()
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('working')
})
app.use('/driver', driverRoutes);

const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
