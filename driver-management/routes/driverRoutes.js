const express = require('express');
const router = express.Router();
const connection = require('../db')
const queries = require('../queries/queries.json');

router.post('/login', async(req, res)=>{
    const {loginId, password} = req.body
    try{
        const driverEmail = await connection.query(queries.driverQueries.getDriverDetails, [loginId])
        if(driverEmail[0].length>0){
            const driver = await connection.query(queries.driverQueries.driverLogin, [loginId, password])
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
        res.status(500).send('Internal Server Error')
    }
})

router.get('/driver/:id', async (req, res)=>{
    const driverId = req.params.id
    try{
        const driverDetails = await connection.query(queries.driverQueries.getDriverById, [driverId])
        if(driverDetails[0].length>0){
            res.status(200).send({driver : driverDetails[0][0]})
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
            res.status(200).send({tripDetails : tripDetails[0]})
        }
        else{
            res.status(404).send('No trips assigned yet')
        }
    }
    catch(err){
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
            res.status(404).send('No previous trips found')
        }
    }
    catch(err){
        res.status(500).send('Some internal error occured')
    }
})

module.exports = router;
