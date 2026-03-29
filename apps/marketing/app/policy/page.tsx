'use client';

import React from 'react';

export default function PolicyPage() {
  return (
    <main style={{ minHeight: '100dvh', padding: '8rem 3.5rem', background: 'var(--deep)', color: 'var(--text)', position: 'relative', zIndex: 1, fontFamily: 'var(--font-serif)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
          AI Agent Policy
        </h1>
        
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>Ethical Intelligence</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
            PrathamOne's AI agents are programmed to be scholarly assistants, not replacements for human intellect. Every AI interaction is transparently documented for academic audit within the Sovereign Network.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>Bias Mitigation</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
            We actively monitor and mitigate cognitive bias within our neural engines to ensure every student in Bharat receives fair, objective, and culturally aligned educational support.
          </p>
        </section>
      </div>
    </main>
  );
}
