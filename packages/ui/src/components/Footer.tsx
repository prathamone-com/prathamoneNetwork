'use client';

import React from 'react';

export const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '4rem 3.5rem',
      background: 'var(--deep)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-serif)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '4rem',
        marginBottom: '4rem',
      }}>
        {/* Column 1: Branding */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <img src="/logo.svg" alt="PrathamOne" style={{ height: '52px', width: 'auto' }} />
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Empowering the brightest minds of Bharat through sovereign AI technology and high-quality curricula.
          </p>
        </div>

        {/* Column 2: Students */}
        <div>
          <h4 style={{ color: 'var(--text)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>Students</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
            <FooterLink href="/classroom" label="Sovereign Classroom" />
            <FooterLink href="/library" label="Scholar Library" />
            <FooterLink href="/progress" label="Intellect Tracker" />
            <FooterLink href="/community" label="Scholar Community" />
          </ul>
        </div>

        {/* Column 3: Institutions */}
        <div>
          <h4 style={{ color: 'var(--text)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>Institutions</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
            <FooterLink href="/admin" label="Administrator Portal" />
            <FooterLink href="/analytics" label="Neural Insights" />
            <FooterLink href="/agents" label="AI Agent Factory" />
            <FooterLink href="/governance" label="Policy & Control" />
          </ul>
        </div>

        {/* Column 4: Sovereignty */}
        <div>
          <h4 style={{ color: 'var(--text)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>Sovereignty</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
            <FooterLink href="/privacy" label="Privacy Standard" />
            <FooterLink href="/terms" label="Terms of Access" />
            <FooterLink href="/policy" label="AI Agent Policy" />
            <FooterLink href="/support" label="Dedicated Support" />
          </ul>
        </div>
      </div>

      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        borderTop: '1px solid var(--border)', paddingTop: '2rem', 
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', 
        textTransform: 'uppercase' 
      }}>
        <div>© MMXXVI PrathamOne AI Collective — Bharat Edition 1.0</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/status" style={{ color: 'var(--gold)' }}>SYSTEM STATUS: OPTIMAL</a>
          <a href="https://prathamone.com" target="_blank" style={{ color: 'var(--text-muted)' }}>PRATHAMONE.COM</a>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <a href={href} style={{ transition: 'color 0.2s', color: 'inherit' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={e => e.currentTarget.style.color = 'inherit'}>
      {label}
    </a>
  </li>
);
