const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flightsSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United", "Delta", "JetBlue", "Emirates"],
    required: true,
  },
  airport: {
    type: String,
    enum: ["SMF", "SCK", "MHR", "OAK", "SFO", "STS", "SJC", "RNO"],
    default: "SMF",
    required: true,
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999999,
    required: true,
  },
  departs: {
    type: Date,
    default: () => {
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      return oneYearFromNow;
    },
  },
});

module.exports = mongoose.model("Flight", flightsSchema);
