const express = require('express');
const router = express.Router();

const PlacesController = require('../controllers/places.controller');

router.get('/', PlacesController.provinces);
router.get('/:province_id', PlacesController.cities);
router.get('/:province_id/:city_id', PlacesController.districts);

module.exports = router;
