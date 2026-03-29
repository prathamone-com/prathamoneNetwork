'use client';

import React from 'react';

export default function CommunityPage() {
  return (
    <main style={{ minHeight: '100dvh', padding: '6rem 3.5rem', background: 'var(--deep)', color: 'var(--text)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 300, letterSpacing: '0.05em' }}>Scholar Community</h1>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <div className="card-luxury" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.8 }}>🤝🌍</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--gold-light)', marginBottom: '1rem' }}>
            Peer-to-Peer Scholar Network
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
            Connect with the brightest minds across Bharat. Share insights, collaborate on complex problems, and grow together in a secure, sovereign environment.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            <button className="btn-luxury" style={{ padding: '1rem 2.5rem' }}>
              Join Discussion →
            </button>
            <button className="btn-luxury" style={{ padding: '1rem 2.5rem', background: 'transparent', border: '1px solid var(--border)' }}>
              Find Study Peer
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
