
const DisplayingInputs=require('../Paths/DisplayingInputs');

const {MongoClient} =require('mongodb');


const express = require('express')
const app = express() 

const dbName='teachforindia';
const url='mongodb+srv://navin:student123@cluster0.uzq32jx.mongodb.net/teachforindia';

const client = new MongoClient(url, { });

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Middleware to handle MongoDB connection
app.use(async (req, res, next) => {
  try {
    
    await client.connect();
    req.db = client.db(dbName); // Attach the database to the request object
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
});



 app.use('/',DisplayingInputs);

app.listen(8000)

