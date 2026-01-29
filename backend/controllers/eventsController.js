const Event = require('../models/Event');

// GET /api/events - list all upcoming events
exports.getEvents = async (req, res) => {
  try {
    const { category, q } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q) {
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') },
        { category: new RegExp(q, 'i') }
      ];
    }

    const events = await Event.find(filter).sort({ date: 1 });
    res.json({ success: true, data: events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to load events' });
  }
};

// GET /api/events/:id - event details
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to load event' });
  }
};

// GET /api/events/categories/list - list all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Event.distinct('category');
    res.json({ success: true, data: categories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to load categories' });
  }
};
