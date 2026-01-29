/**
 * Simple seed script to create sample events.
 * Run: node seed.js (after installing dependencies and setting MONGODB_URI)
 */
require('dotenv').config(); // Load env from current dir (backend)
const mongoose = require('mongoose');
const Event = require('../models/Event');
const Booking = require('../models/Booking');

async function seed() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'event_booking';

  if (!uri) {
    console.error('MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(uri, { dbName, useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Seed script: connected to database '${dbName}'`);
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }

  const now = Date.now();
  const day = 24 * 3600 * 1000;

  // Reliable Static Images
  const uniqueImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80', // Tech
    'https://images.unsplash.com/photo-1459749411177-8c29142af60e?auto=format&fit=crop&w=1200&q=80', // Music
    // Removed Sports Images
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80', // Workshop
    'https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=1200&q=80', // Cultural
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80', // Conference
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80', // Food
    'https://images.unsplash.com/photo-1460661618165-5500a4bd40e3?auto=format&fit=crop&w=1200&q=80', // Art
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80', // Party
    'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1200&q=80', // Yoga (Health)
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80', // Gaming
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80', // Festival
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', // Code
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80', // Dance
    'https://images.unsplash.com/photo-1533174072545-e8d47156b6f2?auto=format&fit=crop&w=1200&q=80', // Comedy
    'https://images.unsplash.com/photo-1571212515416-f2b344537180?auto=format&fit=crop&w=1200&q=80', // Coding
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80', // Talk
    'https://images.unsplash.com/photo-1560523160-754a9e25c68f?auto=format&fit=crop&w=1200&q=80', // Business
    'https://images.unsplash.com/photo-1544928147-79a2af1f9850?auto=format&fit=crop&w=1200&q=80', // Design
    'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1200&q=80', // Networking
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80'  // Shopping
  ];

  /* 
    REMOVED SPORTS.
    Added more Tech/Cultural events.
  */

  const sample = [
    {
      title: 'Vizag Tech Summit 2026',
      image: uniqueImages[0],
      category: 'Tech', location: 'Novotel Varun Beach', date: new Date(now + 2 * day), time: '10:00 AM', price: 2499,
      description: 'The biggest tech confluence in Andhra Pradesh. Join top developers, AI researchers, and startups.',
      totalSeats: 300, availableSeats: 300
    },
    {
      title: 'Sounds on the Sand',
      image: uniqueImages[1],
      category: 'Music', location: 'RK Beach Grounds', date: new Date(now + 5 * day), time: '06:00 PM', price: 999,
      description: 'Live music festival featuring Thaman S and local bands under the stars.',
      totalSeats: 2000, availableSeats: 2000
    },
    // Replaced Marathon (Sports) with Design Workshop
    {
      title: 'UI/UX Design Bootcamp',
      image: uniqueImages[2],
      category: 'Workshops', location: 'IT Hills, Madhurawada', date: new Date(now + 8 * day), time: '09:00 AM', price: 1499,
      description: 'Learn modern UI/UX principles with Figma masters.',
      totalSeats: 40, availableSeats: 40
    },
    {
      title: 'Photography Masterclass',
      image: uniqueImages[3],
      category: 'Workshops', location: 'Tenneti Park', date: new Date(now + 10 * day), time: '09:00 AM', price: 1499,
      description: 'Learn to capture the scenic beauty of Araku and Vizag with pro mentors.',
      totalSeats: 40, availableSeats: 40
    },
    {
      title: 'Andhra Cultural Night',
      image: uniqueImages[4],
      category: 'Cultural', location: 'Gurajada Kalakshetram', date: new Date(now + 17 * day), time: '07:00 PM', price: 299,
      description: 'A celebration of Kuchipudi dance, folk songs, and authentic Telugu cuisine.',
      totalSeats: 500, availableSeats: 500
    },
    {
      title: 'StartUp Vizag Connect',
      image: uniqueImages[5],
      category: 'Conferences', location: 'Gajuwaka Industrial Park', date: new Date(now + 30 * day), time: '10:00 AM', price: 1999,
      description: 'Networking event for entrepreneurs and investors in the Gajuwaka industrial belt.',
      totalSeats: 150, availableSeats: 150
    },
    {
      title: 'Vizianagaram Food Carnival',
      image: uniqueImages[6],
      category: 'Food', location: 'Fort Grounds, Vizianagaram', date: new Date(now + 3 * day), time: '11:00 AM', price: 99,
      description: 'Taste the authentic flavors of Northern Andhra. 50+ stalls and live cooking.',
      totalSeats: 5000, availableSeats: 5000
    },
    {
      title: 'Art Exhibition: Vizag Colors',
      image: uniqueImages[7],
      category: 'Art', location: 'Hawa Mahal, Beach Road', date: new Date(now + 12 * day), time: '10:00 AM', price: 149,
      description: 'Showcasing paintings and sculptures by top local artists.',
      totalSeats: 300, availableSeats: 300
    },
    {
      title: 'Live DJ Night: Neon Bashes',
      image: uniqueImages[8],
      category: 'Music', location: 'The Park Hotel', date: new Date(now + 1 * day), time: '08:00 PM', price: 1499,
      description: 'Let your hair down with DJ Snake (tribute) spinning the best tracks.',
      totalSeats: 400, availableSeats: 350
    },
    {
      title: 'Sunrise Yoga Session',
      image: uniqueImages[9],
      category: 'Health', location: 'Rushikonda Beach', date: new Date(now + 4 * day), time: '06:00 AM', price: 199,
      description: 'Rejuvenate your soul with a guided yoga session at sunrise.',
      totalSeats: 100, availableSeats: 98
    },
    {
      title: 'College Gaming Championship',
      image: uniqueImages[10],
      category: 'Gaming', location: 'Andhra University Hall', date: new Date(now + 14 * day), time: '09:00 AM', price: 499,
      description: 'Inter-college PUBG and Valorant tournament. Big prizes to be won!',
      totalSeats: 200, availableSeats: 200
    },
    {
      title: 'Holi Festival of Colors',
      image: uniqueImages[11],
      category: 'Cultural', location: 'MGM Grounds', date: new Date(now + 25 * day), time: '09:00 AM', price: 599,
      description: 'The biggest Holi party in the city with organic colors and rain dance.',
      totalSeats: 1000, availableSeats: 1000
    },
    {
      title: 'Full Stack Coding Bootcamp',
      image: uniqueImages[12],
      category: 'Tech', location: 'IT Hills, Madhurawada', date: new Date(now + 13 * day), time: '09:00 AM', price: 4999,
      description: 'Intensive 2-day bootcamp on MERN stack development.',
      totalSeats: 50, availableSeats: 45
    },
    {
      title: 'Salsa Night Social',
      image: uniqueImages[13],
      category: 'Workshops', location: 'Novotel Rooftop', date: new Date(now + 6 * day), time: '07:30 PM', price: 799,
      description: 'Learn Salsa basics and dance the night away.',
      totalSeats: 60, availableSeats: 55
    },
    {
      title: 'Standup Comedy: Vizag Laughters',
      image: uniqueImages[14],
      category: 'Cultural', location: 'VMRDA Park Amphitheater', date: new Date(now + 9 * day), time: '07:30 PM', price: 499,
      description: 'Top comedians from Hyderabad and Vizag perform live.',
      totalSeats: 300, availableSeats: 290
    },
    {
      title: 'Hackathon 2026',
      image: uniqueImages[15],
      category: 'Tech', location: 'Symbiosis Center', date: new Date(now + 11 * day), time: '08:00 AM', price: 299,
      description: '24-hour coding marathon to solve smart city problems.',
      totalSeats: 200, availableSeats: 200
    },
    {
      title: 'Business Leadership Talk',
      image: uniqueImages[16],
      category: 'Conferences', location: 'Gateway Hotel', date: new Date(now + 15 * day), time: '05:00 PM', price: 999,
      description: 'Talks by industry leaders on the future of supply chain.',
      totalSeats: 100, availableSeats: 80
    },
    {
      title: 'Gajuwaka Expo 2026',
      image: uniqueImages[17],
      category: 'Business', location: 'Auto Nagar Grounds', date: new Date(now + 35 * day), time: '10:00 AM', price: 0,
      description: 'Industrial exhibition showcasing heavy machinery and tools.',
      totalSeats: 5000, availableSeats: 5000
    },
    // Replaced Cycling (Sports) with Tech Meetup
    {
      title: 'AI Researchers Meetup',
      image: uniqueImages[18],
      category: 'Tech', location: 'Tech Hub, MVP Colony', date: new Date(now + 7 * day), time: '06:00 PM', price: 0,
      description: 'A community meetup for AI enthusiasts.',
      totalSeats: 50, availableSeats: 45
    },
    {
      title: 'Rock Band Concert',
      image: uniqueImages[19],
      category: 'Music', location: 'MGM Grounds', date: new Date(now + 28 * day), time: '07:00 PM', price: 499,
      description: 'Energy-packed performance by the band Agam.',
      totalSeats: 2500, availableSeats: 2400
    }
  ];

  console.log('Clearing old data...');
  await Event.deleteMany({});
  await Booking.deleteMany({});

  console.log(`Inserting ${sample.length} events (No Sports, Unique Images)...`);
  await Event.insertMany(sample);

  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
