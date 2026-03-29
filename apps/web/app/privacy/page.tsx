'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100dvh', padding: '8rem 3.5rem', background: 'var(--deep)', color: 'var(--text)', position: 'relative', zIndex: 1, fontFamily: 'var(--font-serif)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
          Privacy Standard
        </h1>
        
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>Sovereign Data Protection</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
            PrathamOne is committed to the absolute sovereignty of your educational data. Your intellectual progress, neural profiles, and academic submissions are stored and processed within Bharat's secure infrastructure. 
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>AI Professionalism & Safety</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
            No user-identifiable data is used for training public global AI models. Every interaction with our AI agents is encrypted and isolated to the specific educational context of the institution.
          </p>
        </section>

        <div className="card-luxury" style={{ padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
          <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>
            For a deep technical audit of our data governance, please contact our <a href="/support" style={{ color: 'var(--gold)' }}>Sovereignty Team</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
