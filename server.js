
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const budget = require('./models/budget'); 

const app = express();
const port = 4000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('public'));

// MongoDB connection URL
const mongo_url = 'mongodb://127.0.0.1:27017/budgetdb';

// connect to the database
const connectDatabase = async () => {
  try {
    await mongoose.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// disconnect from the database
const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
};


app.get('/hello', (req, res) => {
  res.send('Hello World.');
});

// get budget api for fetching all budgets
app.get('/budget', async (req, res) => {
  try {
    await connectDatabase();
    const data = await budget.find({});
    res.send(data);
  } catch (error) {
    res.status(500).send('Failed to fetch data');
  } finally {
    await disconnectDatabase();
  }
});

app.post('/addbudget', async (req, res) => {
    try {
      await connectDatabase();
      console.log(req.body); 
      let newData = new budget(req.body); // Create a new document
      let savedData = await newData.save(); // Save the document
      res.send('Data inserted Successfully: ' + savedData);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    } finally {
      await disconnectDatabase();
    }
  });
  

// post addbudgets api for adding multiple budgets at once
app.post('/addbudgets', async (req, res) => {
  try {
    await connectDatabase();
    console.log(req.body)

    await budget.insertMany(req.body);
    res.send('Data inserted Successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  } finally {
    await disconnectDatabase();
  }
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
