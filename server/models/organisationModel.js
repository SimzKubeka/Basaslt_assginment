const mongoose = require('mongoose');
const { Schema } = mongoose;

const organisationSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Organisation = mongoose.model('Organisation', organisationSchema);

module.exports = Organisation;
