import React from 'react';

export default function SkeletonCard() {
    return (
        <div className="card skeleton-card">
            <div className="skeleton-thumb shine"></div>
            <div className="card-content">
                <div className="skeleton-line shine" style={{ width: '60%' }}></div>
                <div className="skeleton-line shine" style={{ width: '80%', height: 24, margin: '12px 0' }}></div>
                <div className="skeleton-line shine" style={{ width: '40%' }}></div>
            </div>
        </div>
    );
}
