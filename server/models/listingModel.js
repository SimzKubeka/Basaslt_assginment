const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  agent: {
    type: String,
    ref: 'Agent',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organisation',
    required: true,
  },
  listingType: {
    type: String,
  },
  listingSector: {
    type: String,
  },
  unit: {
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    parking: {
      type: Number,
    },
    price: {
      type: Number,
    },
  },
  images: {
    type: [String],
  },
});

const ListingModel = mongoose.model('ListingModel', listingSchema);

module.exports = ListingModel;
