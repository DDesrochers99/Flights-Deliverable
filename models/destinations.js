const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
    enum: ["SMF", "SCK", "MHR", "OAK", "SFO", "STS", "SJC", "RNO"],
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
});

module.exports = destinationSchema;
