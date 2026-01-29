import React, { useEffect, useState } from 'react';
import { fetchEventsWithFilter } from '../api';
import EventCard from '../components/EventCard';
import SkeletonCard from '../components/SkeletonCard';

const LOCATIONS = ['All Locations', 'Vizag', 'Gajuwaka', 'Madhurawada', 'Vizianagaram'];

// Date Filters
const DATES = ['All Dates', 'This Week', 'This Weekend', 'This Month'];

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDate, setActiveDate] = useState('All Dates');
  const [activeLoc, setActiveLoc] = useState('All Locations');
  const [query, setQuery] = useState('');

  // Initial load
  useEffect(() => {
    loadEvents();
  }, []);

  // Filter change handler
  useEffect(() => {
    const t = setTimeout(() => {
      loadEvents();
    }, 300);
    return () => clearTimeout(t);
  }, [activeDate, activeLoc, query]);

  async function loadEvents() {
    setLoading(true);
    try {
      // Fetch all events then filter client-side for Date logic
      // Ideally backend supports date range, but we stick to existing API + client filter for speed/safety

      let searchQuery = query;
      if (activeLoc !== 'All Locations') {
        searchQuery = `${query} ${activeLoc}`.trim();
      }

      const data = await fetchEventsWithFilter({ category: '', q: searchQuery });

      // Strict filter: Remove events with no image
      let validEvents = data.filter(ev => ev.image && ev.image.trim().length > 0);

      // Apply Date Filter
      validEvents = validEvents.filter(ev => {
        if (activeDate === 'All Dates') return true;

        const eventDate = new Date(ev.date);
        const now = new Date();
        const diffDays = (eventDate - now) / (1000 * 60 * 60 * 24);

        if (activeDate === 'This Week') {
          return diffDays >= 0 && diffDays <= 7;
        }
        if (activeDate === 'This Weekend') {
          // Simple approximation: Next Friday/Saturday/Sunday
          // Ideally check day of week, but 'Next 7 days' is often what users assume
          const dayOfWeek = eventDate.getDay();
          return diffDays >= 0 && diffDays <= 7 && (dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 5);
        }
        if (activeDate === 'This Month') {
          return diffDays >= 0 && diffDays <= 30;
        }
        return true;
      });

      setEvents(validEvents);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="filters-container">
        <div className="search-wrapper">
          {/* Search Icon */}
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            className="search-input"
            placeholder="Search events, locations..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          {query && (
            <button className="clear-search" onClick={() => setQuery('')} aria-label="Clear search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <div style={{ display: 'flex', gap: 16, flexDirection: 'column', flex: 1 }}>
          <div className="chip-group">
            <span className="chip-label">Locations:</span>
            {LOCATIONS.map(loc => (
              <button
                key={loc}
                className={`chip ${activeLoc === loc ? 'active' : ''}`}
                onClick={() => setActiveLoc(loc)}
              >
                {loc}
              </button>
            ))}
          </div>

          <div className="chip-group">
            <span className="chip-label">Date:</span>
            {DATES.map(d => (
              <button
                key={d}
                className={`chip ${activeDate === d ? 'active' : ''}`}
                onClick={() => setActiveDate(d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="event-grid">
        {loading ? (
          Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          events.length > 0 ? (
            events.map(ev => <EventCard key={ev._id} event={ev} />)
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
              <h3>No events found matching your criteria.</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
