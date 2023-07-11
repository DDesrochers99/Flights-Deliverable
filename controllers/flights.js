const Flight = require("../models/flights");

module.exports = {
  index,
  new: newFlight,
  create,
};

async function index(req, res) {
  const flights = await Flight.find({});
  res.render("flights/index", { flights });
}

function newFlight(req, res) {
  res.render("flights/new", { errorMsg: "" });
}

async function create(req, res) {
  try {
    const flightData = {
      airline: req.body.airline,
      airport: req.body.airport,
      flightNo: req.body.flightNo,
      departs: new Date(req.body.departs),
    };

    const flight = new Flight(flightData);
    await flight.save();

    res.redirect("/flights");
  } catch (err) {
    console.log(err);
    res.render("flights/new", { errorMsg: err.message });
  }
}