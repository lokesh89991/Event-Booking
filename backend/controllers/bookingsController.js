const Event = require('../models/Event');
const Booking = require('../models/Booking');
const { sendMail } = require('../utils/mail');

// Create a booking
exports.createBooking = async (req, res) => {
    try {
        const { name, email, eventId, tickets } = req.body;
        if (!name || !email || !eventId || !tickets) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        const ticketsNum = Number(tickets);
        if (ticketsNum <= 0) return res.status(400).json({ success: false, message: 'Invalid ticket count' });

        const t0 = Date.now();
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, availableSeats: { $gte: ticketsNum } },
            { $inc: { availableSeats: -ticketsNum } },
            { new: true }
        );
        console.log(`DB: findOneAndUpdate (decrement seats) took ${Date.now() - t0}ms`);

        if (!updatedEvent) {
            return res.status(400).json({ success: false, message: 'Event not found or insufficient seats' });
        }

        const t1 = Date.now();
        const booking = new Booking({ name, email, event: updatedEvent._id, tickets: ticketsNum });
        await booking.save();
        console.log(`DB: booking.save took ${Date.now() - t1}ms`);

        const subject = `Booking Confirmation - ${updatedEvent.title}`;
        const text = `Hi ${name},\n\nYour booking for ${updatedEvent.title} on ${updatedEvent.date.toUTCString()} is confirmed. Tickets: ${ticketsNum}.\n\nThank you.`;
        const html = `<p>Hi ${name},</p><p>Your booking for <b>${updatedEvent.title}</b> on <b>${updatedEvent.date.toUTCString()}</b> is <b>confirmed</b>.</p><p>Tickets: ${ticketsNum}</p>`;
        sendMail({ to: email, subject, text, html }).catch(err => console.error('Email send failed:', err));

        res.json({ success: true, data: booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to create booking' });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const t0 = Date.now();
        const prevBooking = await Booking.findOneAndUpdate(
            { _id: req.params.id, status: 'CONFIRMED' },
            { $set: { status: 'CANCELLED' } },
            { new: false }
        ).populate('event');
        console.log(`DB: findOneAndUpdate (cancel booking) took ${Date.now() - t0}ms`);

        if (!prevBooking) {
            const exists = await Booking.findById(req.params.id);
            if (!exists) return res.status(404).json({ success: false, message: 'Booking not found' });
            return res.status(400).json({ success: false, message: 'Booking already cancelled' });
        }

        const t1 = Date.now();
        await Event.findByIdAndUpdate(prevBooking.event._id, { $inc: { availableSeats: prevBooking.tickets } });
        console.log(`DB: findByIdAndUpdate (restore seats) took ${Date.now() - t1}ms`);

        const subject = `Booking Cancelled - ${prevBooking.event.title}`;
        const text = `Hi ${prevBooking.name},\n\nYour booking for ${prevBooking.event.title} on ${prevBooking.event.date.toUTCString()} has been cancelled.`;
        const html = `<p>Hi ${prevBooking.name},</p><p>Your booking for <b>${prevBooking.event.title}</b> on <b>${prevBooking.event.date.toUTCString()}</b> has been <b>cancelled</b>.</p>`;
        sendMail({ to: prevBooking.email, subject, text, html }).catch(err => console.error('Email send failed:', err));

        const updated = await Booking.findById(req.params.id).populate('event');
        res.json({ success: true, data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to cancel booking' });
    }
};

// Get booking by id
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('event');
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.json({ success: true, data: booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to fetch booking' });
    }
};
