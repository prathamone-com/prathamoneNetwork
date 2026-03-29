'use client';

import React from 'react';

export default function ProgressPage() {
  return (
    <main style={{ minHeight: '100dvh', padding: '6rem 3.5rem', background: 'var(--deep)', color: 'var(--text)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 300, letterSpacing: '0.05em' }}>Intellect Tracker</h1>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <div className="card-luxury" style={{ padding: '3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.8 }}>📈🧠</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--gold-light)', marginBottom: '1rem' }}>
            Neural Growth Insights
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
            Monitor your academic performance across all subjects. Our AI analyzes your learning patterns to provide high-resolution progress data.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className="card-luxury" style={{ padding: '2rem', textAlign: 'left' }}>
              <div style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>OVERALL EFFICIENCY</div>
              <div style={{ fontSize: '2.5rem' }}>92.4%</div>
            </div>
            <div className="card-luxury" style={{ padding: '2rem', textAlign: 'left' }}>
              <div style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>TIME INVESTED</div>
              <div style={{ fontSize: '2.5rem' }}>142.5h</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
