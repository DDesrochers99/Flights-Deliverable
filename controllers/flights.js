const Flight = require("../models/flights");
const Ticket = require("../models/tickets");

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  createDestination,
  createTicket,
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

    const tickets = await Ticket.find({ flight: flight._id });

    res.render("flights/show", { flight, tickets });
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

async function createTicket(req, res) {
  try {
    console.log("Creating ticket...");
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).send("Flight not found");
    }

    const { seat, price } = req.body;
    const ticketData = {
      seat,
      price,
      flight: flight._id,
    };

    const ticket = new Ticket(ticketData);
    await ticket.save();

    res.redirect(`/flights/${flight._id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/flights");
  }
}
