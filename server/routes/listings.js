// Import dependencies
const express = require('express');
const router = express.Router();
const Listing = require('../models/listingModel');

// GET /api/listings
router.get('/listings', async (req, res) => {
  try {
    const listings = await Listing.find().populate('organisation');
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

//GET /api/listings/:id
router.get('/listings/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
