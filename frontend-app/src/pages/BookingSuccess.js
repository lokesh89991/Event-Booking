import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBooking } from '../api';

export default function BookingSuccess() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    fetchBooking(id).then(b => setBooking(b)).catch(() => { });
  }, [id]);

  if (!booking) return <div>Loading booking...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '60px auto' }}>
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, background: '#D1FAE5', color: '#059669', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', marginBottom: 8 }}>Booking Confirmed!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Your ticket has been booked successfully.</p>

        <div style={{ textAlign: 'left', background: '#F8FAFC', padding: 24, borderRadius: 12, border: '1px solid var(--border)', marginBottom: 32 }}>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Event</span>
            <span style={{ fontWeight: 600 }}>{booking.event.title}</span>
          </div>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Tickets</span>
            <span style={{ fontWeight: 600 }}>{booking.tickets}</span>
          </div>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Amount</span>
            <span style={{ fontWeight: 600 }}>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(booking.tickets * booking.event.price)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 12 }}>
            <span style={{ color: 'var(--text-muted)' }}>Booking ID</span>
            <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{booking._id.slice(-6).toUpperCase()}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/" className="btn" style={{ textDecoration: 'none' }}>Back to Home</Link>
          <Link
            to={`/booking/cancel/${booking._id}`}
            className="btn"
            style={{ background: 'white', color: '#EF4444', border: '1px solid #EF4444' }}
            aria-disabled={canceling}
            onClick={(e) => canceling && e.preventDefault()}
          >
            {canceling ? '...' : 'Cancel Booking'}
          </Link>
        </div>
      </div>
    </div>
  );
}
