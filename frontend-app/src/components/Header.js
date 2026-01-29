import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="site-header">
            <Link to="/" className="brand">
                <div className="logo">
                    {/* Ticket Icon SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                </div>
                <div>
                    <div className="brand-text-main">EventBook <span style={{ color: 'var(--accent)' }}>Vizag</span></div>
                    <div className="brand-text-sub">Discover Experiences</div>
                </div>
            </Link>
            <div className="user-profile">
                {/* Placeholder for user avatar or Login button */}
                <div className="avatar-placeholder">U</div>
            </div>
        </header>
    );
}
