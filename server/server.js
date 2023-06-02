// Import dependencies
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

// Create Express app
const app = express();

// Set up middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const listingsRouter = require('./routes/listings');

// Use routes
app.use('/api', listingsRouter);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Import Models
const Property = require('./models/listingModel');
const Agent = require('./models/agentModel');
const Organisation = require('./models/organisationModel');

// Define a function to read the JSON file and insert the data into the corresponding model
async function populateDatabase() {
  try {
    // Drop the existing collections before inserting data
    await Property.deleteMany();
    await Agent.deleteMany();
    await Organisation.deleteMany();

    // Fetch property listings
    const propertyListingsResponse = await axios.get(
      'https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/listings.json'
    );
    const propertyListings = propertyListingsResponse.data;

    // Insert property listings into Property model
    await Property.insertMany(propertyListings);

    // // Fetch agent data records
    // const agentsResponse = await axios.get(
    //   'https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/agents.json'
    // );
    // const agents = agentsResponse.data;

    // // Insert agent data records into Agent model
    // await Agent.insertMany(agents);

    // Fetch organisation data records
    const organisationsResponse = await axios.get(
      'https://flow-living-staging.s3.eu-west-1.amazonaws.com/public/assessment/organisations.json'
    );
    const organisations = organisationsResponse.data;

    // Insert organisation data records into Organisation model
    await Organisation.insertMany(organisations);

    console.log('Data inserted into the database successfully!');
  } catch (error) {
    console.error('Error populating the database:', error);
  }
}

populateDatabase();
