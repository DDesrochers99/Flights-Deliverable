const Flight = require("../models/flights");

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  createDestination,
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
async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).send("Flight not found");
    }
    res.render("flights/show", { flight });
  } catch (error) {
    console.log(error);
    res.redirect("/flights");
  }
}
async function createDestination(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).send("Flight not found");
    }
    const { airport, arrival } = req.body;
    flight.destinations.push({ airport, arrival });
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/flights");
  }
}
