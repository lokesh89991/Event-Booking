import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPlaceholderFor } from '../imagePlaceholders';

export default function EventCard({ event }) {
    const [imgError, setImgError] = useState(false);
    const [fallbackFailed, setFallbackFailed] = useState(false);

    // Logic: 
    // 1. Try event.image
    // 2. If fail, try placeholder
    // 3. If placeholder fails, show CSS gradient (fallbackFailed = true)

    let imgSrc;
    if (imgError) {
        imgSrc = getPlaceholderFor(event.category).src;
    } else {
        imgSrc = event.image || getPlaceholderFor(event.category).src;
    }

    // Format Price to INR
    const priceFormatted = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(event.price);

    return (
        <div className="card event-card">
            <Link to={`/events/${event._id}`} className="card-link" aria-label={`View details for ${event.title}`}>

                {/* Thumb Container: If fallback fails completely, add 'fallback-gradient' class */}
                <div className={`thumb-container ${fallbackFailed ? 'fallback-gradient' : ''}`}>
                    {!fallbackFailed && (
                        <img
                            src={imgSrc}
                            alt={event.title}
                            className="thumb"
                            onError={() => {
                                if (!imgError) {
                                    setImgError(true); // Try placeholder
                                } else {
                                    setFallbackFailed(true); // Placeholder also failed, give up and show gradient
                                }
                            }}
                            loading="lazy"
                        />
                    )}
                    <div className="category-badge">{event.category}</div>
                    <div className="thumb-overlay"></div>
                </div>

                <div className="card-content">
                    <div className="card-meta">
                        <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                        <span>📍 {event.location.split(',')[0]}</span>
                    </div>

                    <h3 className="title">{event.title}</h3>

                    <div className="card-footer">
                        <div className="price-tag">{priceFormatted}</div>
                        <button className="btn-sm">Book</button>
                    </div>
                </div>
            </Link>
        </div>
    );
}
