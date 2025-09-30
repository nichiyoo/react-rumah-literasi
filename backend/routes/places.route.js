const express = require('express');
const router = express.Router();

const PlacesController = require('../controllers/places.controller');

router.get('/provinces', PlacesController.provinces);
router.get('/provinces/:province_id', PlacesController.cities);
router.get('/provinces/:province_id/:city_id', PlacesController.districts);

module.exports = router;
