'use client';

import React, { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [linkedChild, setLinkedChild] = useState<boolean>(false);
  const [linkCode, setLinkCode] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('prathamone_guest_profile');
      if (stored) setProfile(JSON.parse(stored));
    } catch(e) {}
  }, []);

  const role = profile?.role;

  // ─── PARENT DASHBOARD ───────────────────────────────────────────────
  if (role === 'Parent') {
    return (
      <main style={{ minHeight: '100dvh', padding: '4rem 2rem', background: 'var(--background)', color: 'var(--text)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="fade-up" style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Parent Portal</div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--text)' }}>Your Family Dashboard</h1>
          </div>

          {!linkedChild ? (
            <div className="card fade-up" style={{ background: 'var(--surface)', border: '1px dashed var(--gold)', borderRadius: '20px', padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔗</div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--gold-light)', marginBottom: '1rem' }}>Link Your Child's Account</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
                Ask your child to open their PrathamOne app and share their unique 6-digit Link Code from Settings. Once linked, you can track their progress, study time, and weak areas without ever interfering with their learning.
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={linkCode}
                  onChange={e => setLinkCode(e.target.value)}
                  maxLength={6}
                  style={{ padding: '0.9rem 1.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text)', fontSize: '1.1rem', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)', outline: 'none', width: '200px', textAlign: 'center' }}
                />
                <button className="btn-luxury" style={{ padding: '0.9rem 2rem' }} onClick={() => linkCode.length === 6 && setLinkedChild(true)}>
                  Link Account →
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="card fade-up" style={{ background: 'var(--surface)', border: '1px solid var(--gold)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>LINKED STUDENT</div>
                  <h2 style={{ fontSize: '1.4rem' }}>Arjun (Grade IX — CBSE)</h2>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.3rem' }}>Last active: 45 minutes ago</div>
                </div>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', color: 'var(--gold)', fontWeight: 600 }}>74%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weekly Goal</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', color: '#4caf50', fontWeight: 600 }}>12h</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Study Time</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                <div className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text)' }}>Subject Performance</h3>
                  {[['Mathematics', 82], ['Science', 65], ['English', 90]].map(([sub, pct]) => (
                    <div key={sub as string} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                        <span>{sub}</span><span style={{ color: (pct as number) < 70 ? '#ff6b6b' : 'var(--gold)' }}>{pct}%</span>
                      </div>
                      <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: (pct as number) < 70 ? '#ff6b6b' : 'var(--gold)', borderRadius: '2px' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card" style={{ background: 'rgba(255,50,50,0.04)', border: '1px dashed rgba(255,100,100,0.3)', borderRadius: '14px', padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#ff6b6b' }}>AI Detected Weak Areas</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <p style={{ marginBottom: '0.7rem' }}>⚠ Science: Photosynthesis (54%)</p>
                    <p>⚠ Maths: Quadratic Equations (61%)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  // ─── TEACHER / INSTITUTE DASHBOARD ──────────────────────────────────
  if (role === 'Teacher' || role === 'Institute') {
    return (
      <main style={{ minHeight: '100dvh', padding: '4rem 2rem', background: 'var(--background)', color: 'var(--text)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="fade-up" style={{ marginBottom: '3rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
              {profile?.teacherType === 'Institute Teacher' ? 'Staff Portal' : 'Educator Hub'}
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 300 }}>My Classroom Management</h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {[['👩‍🎓', 'Active Students', '46'], ['📚', 'Assigned Classes', '3'], ['📊', 'Avg. Class Score', '71%']].map(([icon, label, val]) => (
              <div key={label as string} className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{icon}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{label}</div>
                <div style={{ fontSize: '2rem', color: 'var(--gold)', fontWeight: 300 }}>{val}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Class Roster — Mathematics IX-A</h3>
            {['Priya S.', 'Rohan M.', 'Sneha K.'].map((name, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                <div>{name}</div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Score: {[82, 61, 90][i]}%</span>
                  <span style={{ color: [82, 61, 90][i] < 70 ? '#ff6b6b' : '#4caf50' }}>{[82, 61, 90][i] < 70 ? 'Needs Help' : 'On Track'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ─── STUDENT DASHBOARD (DEFAULT) ────────────────────────────────────
  return (
    <main style={{ minHeight: '100dvh', padding: '4rem 2rem', background: 'var(--background)', color: 'var(--text)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div className="fade-up" style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--gold-light)' }}>
            Welcome back, Scholar 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
            {profile ? `${profile.stateBoard || profile.board} Board • Grade ${profile.grade}` : 'Loading your workspace...'}
          </p>
        </div>

        {/* RESUME MODULE */}
        <div className="card fade-up delay-1" style={{ background: 'var(--surface)', border: '1px solid var(--gold)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Resume Learning</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text)' }}>Mathematics: Advanced Calculus</h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Last active: 2 hours ago</div>
          </div>
          <button className="btn-luxury" style={{ padding: '1rem 2rem' }} onClick={() => window.location.href = '/classroom'}>
            Continue Session →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          
          {/* TODAY'S PLAN */}
          <div className="card fade-up delay-2" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text)' }}>Today's Plan</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--gold)', flexShrink: 0 }}></div>
                <div style={{ fontSize: '1rem' }}>Finish Calculus Module 4</div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--border)', flexShrink: 0 }}></div>
                <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Science Topic Review</div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--border)', flexShrink: 0 }}></div>
                <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>English Grammar Practice</div>
              </div>
            </div>
          </div>

          {/* AI DIAGNOSTICS */}
          <div className="card fade-up delay-3" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text)' }}>AI Diagnostics</h3>
            <div style={{ background: 'rgba(255,50,50,0.05)', border: '1px dashed rgba(255,100,100,0.3)', borderRadius: '12px', padding: '1.2rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#ff6b6b', marginBottom: '0.5rem', fontWeight: 600 }}>⚠ Weak Area: Trigonometry</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>Accuracy dropped below 60%. A concept review session is strongly recommended.</div>
            </div>
            <button className="btn-luxury" style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', background: 'transparent' }} onClick={() => window.location.href = '/classroom'}>
              Start Recommended Lesson →
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}


