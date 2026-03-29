'use client';

'use client';

import React from 'react';

/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.1.0
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

export default function Dashboard() {
  return (
    <main style={{ minHeight: '100dvh', padding: '4rem 3.5rem', background: 'var(--deep)', color: 'var(--text)', position: 'relative', zIndex: 1 }}>
      {/* Stats Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        <StatCard title="SOLAR COINS" value="2,450" icon="🪙" />
        <StatCard title="CHAPTERS PURSUED" value="18/42" icon="📚" />
        <StatCard title="INTELLECT TIME" value="12.5h" icon="⏱️" />
      </section>

      {/* Active Learning */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 400, letterSpacing: '0.05em' }}>Current Pursuit</h2>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>
        
        <div className="card-luxury" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ 
            width: '100px', height: '100px', 
            background: 'linear-gradient(135deg, rgba(201,168,76,0.2), transparent)', 
            border: '1px solid var(--border)',
            borderRadius: '12px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '2.5rem',
            boxShadow: '0 0 20px rgba(201,168,76,0.1)'
          }}>
            🧪
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 400, color: 'var(--gold-light)' }}>Organic Chemistry: Part II</h3>
            <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0.5rem 0 1.5rem' }}>
              Grade XII • MSBSHSE
            </p>
            <div style={{ height: '2px', background: 'var(--surface-3)', borderRadius: '1px', overflow: 'hidden', maxWidth: '400px' }}>
              <div style={{ width: '65%', height: '100%', background: 'var(--gold)' }} />
            </div>
          </div>
          <button className="btn-luxury" style={{ padding: '0.8rem 2rem', fontSize: '0.9rem' }}>
            Resume Pursuit →
          </button>
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="card-luxury" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em' }}>{title}</span>
        <span style={{ fontSize: '1.2rem', opacity: 0.8 }}>{icon}</span>
      </div>
      <div className="text-gold" style={{ fontSize: '2.8rem', fontWeight: 300, letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
}

