'use client';

import React from 'react';

export default function StatusPage() {
  return (
    <main style={{ minHeight: '100dvh', padding: '6rem 3.5rem', background: 'var(--deep)', color: 'var(--text)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 300, letterSpacing: '0.05em' }}>System Status</h1>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <div className="card-luxury" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', color: '#4ade80' }}>●</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--gold-light)', marginBottom: '1rem' }}>
            All Systems Operating Optimally
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
            The Sovereign AI Network is performing at high-resolution across all regions. Total network uptime: 99.99%.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {['API Gateway', 'Neural Engine', 'Database Cluster', 'Global CDN'].map(service => (
              <div key={service} className="card-luxury" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(74, 222, 128, 0.2)' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#4ade80' }}>{service}</h3>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Operational</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
