'use client';

import React from 'react';

export default function GovernancePage() {
  return (
    <main style={{ minHeight: '100dvh', padding: '6rem 3.5rem', background: 'var(--deep)', color: 'var(--text)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 300, letterSpacing: '0.05em' }}>Policy & Control</h1>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <div className="card-luxury" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.8 }}>🏛️🔐</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--gold-light)', marginBottom: '1rem' }}>
            Systemic Integrity & Oversight
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
            Configure the ethical guardrails and security protocols for the Sovereign AI Network. Ensure full compliance with national standards.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {['Access Control', 'Ethics Policy', 'Audit Logs', 'Compliance'].map(title => (
              <div key={title} className="card-luxury" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--gold)' }}>{title}</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Define boundaries</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
