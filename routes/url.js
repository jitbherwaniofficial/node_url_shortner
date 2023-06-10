const express = require('express');
const { GenerateNewShortURL, handleGetAnalytics,handleGetAllShortURLs } = require('../controllers/url')

const router = express.Router();

router.get('/', handleGetAllShortURLs)

router.post('/', GenerateNewShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;