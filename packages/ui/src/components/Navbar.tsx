'use client';

import React from 'react';

export interface NavbarProps {
  type: 'marketing' | 'platform';
  userName?: string;
}

export const Navbar = ({ type, userName }: NavbarProps) => {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      padding: '1rem 5%',
      background: 'rgba(10, 10, 15, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Brand */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <img 
          src="/logo.svg" 
          alt="PrathamOne" 
          style={{ 
            height: '48px', 
            width: 'auto',
            filter: 'drop-shadow(0 0 10px rgba(255,183,0,0.3))'
          }} 
        />
      </a>

      {/* Navigation Links */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {type === 'marketing' ? (
          <>
            <a href="/about" style={{ color: 'var(--text-muted)' }}>About</a>
            <a href="/curriculum" style={{ color: 'var(--text-muted)' }}>Curricula</a>
            <a href="/login" style={{ 
              color: 'var(--gold-light)', 
              border: '1px solid var(--gold)', 
              padding: '0.5rem 1.2rem', 
              borderRadius: '6px',
              background: 'rgba(201,168,76,0.1)'
            }}>Access Portal</a>
          </>
        ) : (
          <>
            <a href="/dashboard" style={{ color: 'var(--gold-light)' }}>Dashboard</a>
            <a href="/classroom" style={{ color: 'var(--text-muted)' }}>Classroom</a>
            <a href="/library" style={{ color: 'var(--text-muted)' }}>Library</a>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginLeft: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)' }}>JAWAHAR R MALLAH</div>
              </div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--surface-3)', border: '1px solid var(--border)' }} />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
