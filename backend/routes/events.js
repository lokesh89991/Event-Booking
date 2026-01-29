const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

// GET /api/events - list all upcoming events
router.get('/', eventsController.getEvents);

// GET /api/events/categories/list - list all categories
// Note: This must come before /:id to prevent "categories" from being interpreted as an id
router.get('/categories/list', eventsController.getCategories);

// GET /api/events/:id - event details
router.get('/:id', eventsController.getEventById);

module.exports = router;
