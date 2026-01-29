import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBooking, cancelBooking } from '../api';

export default function CancelBooking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchBooking(id).then(b => setBooking(b)).catch(() => { }); }, [id]);

  async function onCancel() {
    setMessage('');
    setLoading(true);
    try {
      await cancelBooking(id);
      setMessage('Booking cancelled. A confirmation email was sent.');
      setBooking(prev => ({ ...prev, status: 'CANCELLED' }));
    } catch (err) {
      setMessage('Failed to cancel booking');
    } finally {
      setLoading(false);
    }
  }

  if (!booking) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 500, margin: '60px auto' }}>
      <div className="card" style={{ padding: 40, textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16 }}>Cancel Booking</h3>

        {booking.status === 'CANCELLED' ? (
          <div style={{ background: '#FEF2F2', color: '#B91C1C', padding: 16, borderRadius: 8, marginBottom: 24 }}>
            Booking has been cancelled.
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
              Are you sure you want to cancel your booking for <strong>{booking.event.title}</strong>? This action cannot be undone.
            </p>
            {message && <div style={{ marginBottom: 16, color: 'var(--primary)' }}>{message}</div>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                className="btn"
                onClick={onCancel}
                disabled={loading}
                style={{ background: '#EF4444', width: '100%' }}
              >
                {loading ? <span className="spinner" /> : 'Confirm Cancellation'}
              </button>
              <Link to="/" className="btn" style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', width: 'auto' }}>
                Nevermind, Keep it
              </Link>
            </div>
          </>
        )}

        {booking.status === 'CANCELLED' && (
          <Link to="/" className="btn" style={{ marginTop: 16 }}>Back to Events</Link>
        )}
      </div>
    </div>
  );
}
