var express = require('express');
var router = express.Router();

const flightsCtrl = require("../controllers/flights");


router.get("/", flightsCtrl.index);

router.get("/new", flightsCtrl.new);

router.post("/", flightsCtrl.create);

router.get("/:id", flightsCtrl.show);

router.post("/:id/destinations", flightsCtrl.createDestination);

module.exports = router;
module.exports = router;
