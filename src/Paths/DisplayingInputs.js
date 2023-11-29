
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const router = express.Router();

//  MongoDB connection details
const dbName = 'teachforindia';
const url = 'mongodb+srv://navin:student123@cluster0.uzq32jx.mongodb.net/teachforindia';

// Creating a MongoDB client
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connect to MongoDB
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
app.use(express.json())
// Use the router for /specificpath
app.use('/specificpath', router);
app.use((req,res,next)=>{
  req.db=client.db(dbName);
  next();
});
// Define a route to display all data
router.get('/displayAll', async function (req, res, next) {
  try {
    // Access the MongoDB database from the request object
    const db = req.db;

    
    const collection = db.collection('VolunteerData');

    // Fetch all documents from the collection
    const data = await collection.find({}).toArray();

    console.log('All data:', data);

    res.json({ message: 'Data displayed', data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from the database' });
  }
});

//saving data
router.post('/savevolunteerdata',async function(req,res,next){
  try{
    const db=req.db;
    const collection=db.collection('VolunteerData');
    console.log('Request Body:', req.body);
    const formdata=({
      name:req.body.name,
      contact:req.body.contact,
      email:req.body.email,
      location:req.body.location,
      language:req.body.checkedLanguageValue || [],
      availability:req.body.weekcheckedWeekValue || [],
    });
    const result=await collection.insertOne(formdata);
    console.log('MongoDB Insert Result:', result);
    res.status(201).json({ message: 'Data saved successfully' });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = app;
