const mongoose = require('mongoose');
const { Schema } = mongoose;

const agentSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: false, // Make the field optional
  },
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
