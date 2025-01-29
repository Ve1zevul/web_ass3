const axios = require('axios');
const ApiHistory = require('../models/ApiHistory');

exports.getWeather = (req, res) => {
    res.render('weather', { weather: null, error: null, user: req.session.user || null });
};

exports.postWeather = async (req, res) => {
    const city = req.body.city;
    const openWeatherApiKey = process.env.OPENWEATHER_API_KEY;

    try {
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`
        );

        const weatherData = weatherResponse.data;

        const weather = {
            city: weatherData.name,
            country: weatherData.sys.country,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            description: weatherData.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
        };

        const apiHistory = new ApiHistory({
            userId: req.session.user.userId,
            apiName: 'OpenWeather',
            requestData: { city },
            responseData: weather,
        });
        await apiHistory.save();

        res.render('weather', { weather, error: null, user: req.session.user || null });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.render('weather', { weather: null, error: 'Error fetching weather data. Please try again.', user: req.session.user || null });
    }
};


exports.getPokemonData = (req, res) => {
    res.render('api1', { pokemon: null, error: null, user: req.session.user || null });
};

exports.postPokemonData = async (req, res) => {
    const pokemonName = req.body.pokemonName;

    try {
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const pokemonData = pokemonResponse.data;

        const pokemon = {
            name: pokemonData.name,
            id: pokemonData.id,
            height: pokemonData.height,
            weight: pokemonData.weight,
            types: pokemonData.types.map(type => type.type.name).join(', '),
            abilities: pokemonData.abilities.map(ability => ability.ability.name).join(', '),
            sprite: pokemonData.sprites.front_default,
        };

        const apiHistory = new ApiHistory({
            userId: req.session.user.userId,
            apiName: 'PokéAPI',
            requestData: { pokemonName },
            responseData: pokemon,
        });
        await apiHistory.save();

        res.render('api1', { pokemon, error: null, user: req.session.user || null });
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        res.render('api1', { pokemon: null, error: 'Pokémon not found. Please try again.', user: req.session.user || null });
    }
};
exports.getPokemonCardData = (req, res) => {
    res.render('api2', { card: null, error: null, user: req.session.user || null });
};

exports.postPokemonCardData = async (req, res) => {
    const cardName = req.body.cardName;

    try {
        const cardResponse = await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${cardName}`);
        const cardData = cardResponse.data.data[0];

        const card = {
            name: cardData.name,
            id: cardData.id,
            image: cardData.images.large,
            rarity: cardData.rarity,
            set: cardData.set.name,
        };

        const apiHistory = new ApiHistory({
            userId: req.session.user.userId,
            apiName: 'Pokémon TCG API',
            requestData: { cardName },
            responseData: card,
        });
        await apiHistory.save();

        res.render('api2', { card, error: null, user: req.session.user || null });
    } catch (error) {
        console.error('Error fetching Pokémon card data:', error);
        res.render('api2', { card: null, error: 'Card not found. Please try again.', user: req.session.user || null });
    }
};
exports.getHistory = async (req, res) => {
    try {
        const history = await ApiHistory.find({ userId: req.session.user.userId }).sort({ timestamp: -1 });
        res.render('history', { history, user: req.session.user || null });
    } catch (error) {
        console.error('Error fetching history:', error);
        res.render('history', { history: [], user: req.session.user || null });
    }
};