const express = require('express');
const router = express.Router();
const connection = require('../db')
const queries = require('../SQL/queries.json');

router.post('/login', async(req, res)=>{
    const {email, password} = req.body
    try{
        console.log(req.body)
        const driverEmail = await connection.query(queries.driverQueries.getDriverDetails, [email])
        if(driverEmail[0].length>0){
            const driver = await connection.query(queries.driverQueries.driverLogin, [email, password])
            console.log(driver[0])
            if(driver[0].length>0){
                res.status(200).send({message : 'Logged in successfully', driverId : driver[0][0].DriverId})
            }
            else{
                res.status(401).send('Invalid credentials')
            }
        }
        else{
            res.status(404).send('User not found')
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/driver/:id', async (req, res)=>{
    const driverId = req.params.id
    try{
        const driverDetails = await connection.query(queries.driverQueries.getDriverById, [driverId])
        if(driverDetails[0].length>0){
            res.status(200).send({driver : driverDetails[0]})
        }
    }
    catch(err){
        res.status(500).send('Internal Server Error')
    }
    
})

router.get('/getTripDetails/:id', async (req, res)=>{
    const driverId = req.params.id
    try{
        const tripDetails = await connection.query(queries.driverQueries.getDriverAssignedTrips, [driverId])
        if(tripDetails[0].length>0){
            console.log(tripDetails[0])
            res.status(200).send({tripDetails : tripDetails[0]})
        }
        else{
            res.status(404).send('No trips assigned yet')
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send('Some internal server error')
    }
})

router.get('/getTripHistory/:id', async (req, res)=>{
    const driverId = req.params.id
    try{
        const tripHistory = await connection.query(queries.driverQueries.getDriverHistory, [driverId])
        if(tripHistory[0].length>0){
            res.status(200).send({trip : tripHistory[0]})
        }      
        else{
            res.status(200).send('No previous trips found')
        }
    }
    catch(err){
        res.status(500).send('Some internal error occured')
    }
}) 

router.post('/changePassword', async (req, res) => {
    const { driverId, oldPassword, newPassword } = req.body;
    try {
     
      const driver = await connection.query(
        'SELECT * FROM DriverDetails WHERE DriverId = ? AND DriverPassword = ?',
        [driverId, oldPassword]
      );
      
    
      if (driver[0].length === 0) {
        return res.status(404).json({ success: false, message: 'Driver not found' });
      }
  

      const isMatch = oldPassword === driver[0][0].DriverPassword ? true : false;
      if (!isMatch) {
        return res.json({ success: false, message: 'Old password is incorrect.' });
      }
  

      await connection.query(
        'UPDATE DriverDetails SET DriverPassword = ? WHERE DriverId = ?',
        [newPassword, driverId]
      );
      
      
      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  

  router.post('/validateOtp', async (req, res) => {
    const { tripId, otp } = req.body;

    if (!tripId || !otp) {
        return res.status(400).json({
            success: false,
            message: 'Missing tripId or otp in the request',
        });
    }

    try {
        const result = await connection.query(
            'SELECT OTP FROM OTPDetails WHERE TripId = ?',
            [tripId]
        );

        if (result[0].length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found or no OTP available for this trip',
            });
        }

        const storedOtp = result[0][0].OTP;

        if (storedOtp === otp) {
            return res.status(200).json({
                success: true,
                message: 'OTP verified successfully',
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP',
            });
        }
    } catch (err) {
        console.error('Error validating OTP:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

module.exports = router;
