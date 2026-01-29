import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEvent, createBooking } from '../api';
import { getPlaceholderFor } from '../imagePlaceholders';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', tickets: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetchEvent(id).then(e => { setEvent(e); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  function onChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    const tickets = Number(form.tickets);
    if (!form.name || !form.email || tickets <= 0) return setError('Please fill name, email, valid ticket count');
    if (tickets > event.availableSeats) return setError('Not enough available seats');
    setBookingLoading(true);
    try {
      const booking = await createBooking({ name: form.name, email: form.email, eventId: id, tickets });
      navigate(`/booking/success/${booking._id}`);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  }

  if (loading) return <div style={{ textAlign: 'center', marginTop: 100 }}>Loading...</div>;
  if (!event) return <div style={{ textAlign: 'center', marginTop: 100 }}>Event not found</div>;

  const imgSrc = imgError ? getPlaceholderFor(event.category).src : (event.image || getPlaceholderFor(event.category).src);

  // Format Price
  const priceFormatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(event.price);

  return (
    <div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: 24 }}>
        <div style={{ height: 400, width: '100%', position: 'relative' }}>
          <img
            src={imgSrc}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            padding: '40px 24px 24px 24px',
            color: 'white'
          }}>
            <div style={{ textTransform: 'uppercase', fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 8, color: 'var(--accent)' }}>
              {event.category}
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{event.title}</h1>
            <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: '1.1rem', opacity: 0.9 }}>
              <span>📅 {new Date(event.date).toLocaleDateString()} at {event.time}</span>
              <span>📍 {event.location}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, padding: 32 }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 16 }}>About Event</h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text-muted)', fontSize: '1.05rem' }}>{event.description}</p>

            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 12 }}>Location</h3>
              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid var(--border)', display: 'inline-block' }}>
                📍 {event.location}
              </div>
            </div>
          </div>

          <div>
            <div className="card" style={{ padding: 24, position: 'sticky', top: 100, boxShadow: 'var(--shadow-lg)', border: '1px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Price per ticket</span>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>{priceFormatted}</span>
              </div>

              <div style={{ marginBottom: 24, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                <span style={{ color: event.availableSeats < 20 ? 'red' : 'var(--accent)', fontWeight: 700 }}>
                  {event.availableSeats}
                </span> seats remaining
              </div>

              {error && <div style={{ color: 'red', marginBottom: 12, fontSize: '0.9rem', background: '#FEF2F2', padding: 8, borderRadius: 8 }}>{error}</div>}

              <form onSubmit={onSubmit}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.9rem' }}>Your Name</label>
                  <input name="name" value={form.name} onChange={onChange} className="search-bar" style={{ width: '100%', borderRadius: 8 }} placeholder="John Doe" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
                  <input name="email" value={form.email} onChange={onChange} className="search-bar" style={{ width: '100%', borderRadius: 8 }} placeholder="john@example.com" />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: '0.9rem' }}>Tickets</label>
                  <input name="tickets" type="number" min="1" max={event.availableSeats} value={form.tickets} onChange={onChange} className="search-bar" style={{ width: '100%', borderRadius: 8 }} />
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Total: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(form.tickets * event.price)}</div>
                </div>

                <button className="btn" style={{ width: '100%', padding: 16, fontSize: '1.1rem' }} type="submit" disabled={bookingLoading}>
                  {bookingLoading ? <span className="spinner" /> : 'Confirm Booking'}
                </button>
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                  Secure payment powered by Stripe (Mock)
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
