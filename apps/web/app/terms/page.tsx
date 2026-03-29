'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <main style={{ minHeight: '100dvh', padding: '8rem 3.5rem', background: 'var(--deep)', color: 'var(--text)', position: 'relative', zIndex: 1, fontFamily: 'var(--font-serif)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
          Terms of Access
        </h1>
        
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>Academic Integrity</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
            The PrathamOne Sovereign Network is provided for the sole purpose of high-quality educational and intellectual advancement. Use of our AI Agents to bypass academic integrity is strictly prohibited and subject to institutional policy.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>Intellectual Sovereignty</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
            All content generated within the platform is the property of the respective scholar and institution, protected by national copyright standards and processed locally for security.
          </p>
        </section>
      </div>
    </main>
  );
}
