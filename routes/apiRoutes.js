const express = require('express');
const apiController = require('../controllers/apiController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.use(requireAuth);

router.get('/weather', apiController.getWeather);
router.post('/weather', apiController.postWeather);

router.get('/api1', apiController.getPokemonData);
router.post('/api1', apiController.postPokemonData);

router.get('/api2', apiController.getPokemonCardData);
router.post('/api2', apiController.postPokemonCardData);

router.get('/history', apiController.getHistory);

module.exports = router;