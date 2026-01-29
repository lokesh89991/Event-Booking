require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventsRouter = require('./routes/events');
const bookingsRouter = require('./routes/bookings');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRouter);
app.use('/api/bookings', bookingsRouter);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // Use MONGODB_URI (Atlas) and optional MONGODB_DB to target a specific DB
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/event_booking';
    const dbName = process.env.MONGODB_DB || 'event_booking';

    // Mongoose v7+ warnings suppression for strictQuery
    mongoose.set('strictQuery', false);

    await mongoose.connect(uri, { dbName, useNewUrlParser: true, useUnifiedTopology: true });

    // Log success without exposing credentials
    const isAtlas = uri.includes('mongodb+srv') || uri.includes('mongodb.net');
    if (isAtlas) {
      console.log(`MongoDB connected (Atlas) -> database: ${dbName}`);
    } else {
      console.log(`MongoDB connected -> database: ${dbName}`);
    }

    app.listen(PORT, () => console.log('Server running on port', PORT));
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message || err);
    process.exit(1);
  }
}

start();
