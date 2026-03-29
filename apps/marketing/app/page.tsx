'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MarketingPage() {
  const [role, setRole] = useState<string | null>(null);
  const [teacherType, setTeacherType] = useState<string | null>(null);
  const [board, setBoard] = useState<string | null>(null);
  const [stateBoard, setStateBoard] = useState<string | null>(null);
  const [grade, setGrade] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleEnterWorkspace = () => {
    setModalOpen(true);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* MODAL */}
      <div className={`modal-backdrop ${isModalOpen ? 'open' : ''}`} onClick={() => setModalOpen(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--gold-light)', marginBottom: '0.6rem' }}>
            Entering Workspace
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1.8rem', lineHeight: 1.6 }}>
            Your sovereign AI classroom is being prepared. This platform connects directly to your verified institutional backend.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>Cancel</button>
            <button 
              className="modal-close" 
              style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
              onClick={() => {
                try {
                  localStorage.setItem('prathamone_guest_profile', JSON.stringify({ role, board, stateBoard, grade, lang }));
                } catch(e) {}
                window.location.href = process.env.NEXT_PUBLIC_WEB_URL ? `${process.env.NEXT_PUBLIC_WEB_URL}/classroom` : 'http://localhost:3001/classroom';
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>

      {/* HEADER OVERRIDE */}
      <header style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.8rem 3.5rem',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(8px)'
      }}>
        <div className="logo-wrap fade-down" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/logo.svg" alt="PrathamOne" style={{ width: '44px', height: '44px', borderRadius: '10px', filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.4))' }} />
          <div>
            <div className="logo-text" style={{ 
              fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.05em',
              background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>PrathamOne</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '1px' }}>
              Sovereign AI Collective
            </div>
          </div>
        </div>
        <div className="tagline fade-down delay-1" style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase'
        }}>
          Established 2026 • Bharat Edition 1.0
        </div>
        <div className="badge fade-down delay-3" style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--gold)', border: '1px solid var(--border)', padding: '0.35rem 0.9rem', borderRadius: '999px', textTransform: 'uppercase'
        }}>
          NCERT Verified
        </div>
      </header>

      {/* HERO */}
      <section className="hero fade-up delay-2" style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '6rem 2rem 4rem' }}>
        <div className="est" style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.4rem', display: 'inline-flex', alignItems: 'center', gap: '0.8rem' 
        }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
          Bharat Edition 1.0
          <div style={{ width: '40px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
        </div>
        <h1 style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--text)', marginBottom: '0.4rem' }}>
          India's <span className="text-gold" style={{ fontWeight: 700 }}>AI Study Companion</span><br/>Built for every student in India
        </h1>
        <p className="hero-sub" style={{ fontSize: '1.2rem', fontWeight: 300, color: 'var(--text-muted)', margin: '1.4rem auto 0', maxWidth: '520px', lineHeight: 1.6 }}>
          High-quality curricula. Sovereign technology. Neural engines built for the brightest minds of Bharat.
        </p>
      </section>

      {/* MAIN */}
      <main style={{ flex: 1, margin: '0 auto', width: '100%', maxWidth: '900px', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 2rem)', display: 'flex', flexDirection: 'column' }}>
        
        {/* ROLE SELECTION */}
        <div className="card fade-up" style={{ marginBottom: '1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
          <div className="section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            Step 01 — Choose Your Role
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>
          <div className="select-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.4rem' }}>
            {['Student', 'Teacher', 'Parent', 'Institute'].map(r => (
              <button key={r} className={`sel-btn ${role === r ? 'active' : ''}`} onClick={() => {
                setRole(r);
                setTeacherType(null); // Reset teacher state if role changes
              }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* PARENT DIRECT ENTRY */}
        {role === 'Parent' && (
          <div className="card fade-up" style={{ marginBottom: '1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
            <div className="section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              Parent Portal
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--gold-light)' }}>Secure Child Link</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
              You do not need to configure a curriculum. Log in directly to the Sovereign Platform to link your child's account via a secure invitation code. Track their real-time cognitive progress and AI diagnostics without disrupting their learning flow.
            </p>
            <button className="btn-luxury" style={{ padding: '1rem 2rem' }} onClick={() => {
              window.location.href = process.env.NEXT_PUBLIC_WEB_URL ? `${process.env.NEXT_PUBLIC_WEB_URL}/dashboard` : 'http://localhost:3001/dashboard';
            }}>
              Log In to Parent Dashboard →
            </button>
          </div>
        )}

        {/* INSTITUTE ENTRY (ENTERPRISE ONLY) */}
        {role === 'Institute' && (
          <div className="card fade-up" style={{ marginBottom: '1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
            <div className="section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              Institutional Access
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text)' }}>Enterprise Registration</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
              Access the Sovereign backend to manage classrooms, deploy AI-augmented curricula, and review holistic student analytics.
            </p>
            <button className="btn-luxury" style={{ padding: '1rem 2rem' }} onClick={() => {
              window.location.href = process.env.NEXT_PUBLIC_WEB_URL ? `${process.env.NEXT_PUBLIC_WEB_URL}/dashboard` : 'http://localhost:3001/dashboard';
            }}>
              Access Backend Portal →
            </button>
          </div>
        )}

        {/* TEACHER PROGRESSIVE ONBOARDING */}
        {role === 'Teacher' && (
          <>
            <div className="card fade-up" style={{ marginBottom: '1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
              <div className="section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                Step 02 — Educator Profile
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>
              <div className="select-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.4rem' }}>
                {['Independent Teacher', 'Institute Teacher'].map(t => (
                  <button key={t} className={`sel-btn ${teacherType === t ? 'active' : ''}`} onClick={() => setTeacherType(t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* INDEPENDENT TEACHER BLOCK */}
            {teacherType === 'Independent Teacher' && (
              <div className="card fade-up" style={{ marginBottom: '1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--gold-light)' }}>Independent Academy Control</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
                  Solo educators enjoy full autonomy. Set up your personal dashboard to manage your own students, launch custom classes, and retain total syllabus control.
                </p>
                <button className="btn-luxury" style={{ padding: '1rem 2rem' }} onClick={() => {
                  window.location.href = process.env.NEXT_PUBLIC_WEB_URL ? `${process.env.NEXT_PUBLIC_WEB_URL}/dashboard` : 'http://localhost:3001/dashboard';
                }}>
                  Access Solo Dashboard →
                </button>
              </div>
            )}

            {/* INSTITUTE TEACHER BLOCK */}
            {teacherType === 'Institute Teacher' && (
              <div className="card fade-up" style={{ marginBottom: '1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
                <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text)' }}>Institutional Staff Portal</h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2rem' }}>
                  You are registered under a verified school or institute. Proceed to the Staff Portal using your assigned credentials to access your pre-configured assigned classrooms.
                </p>
                <button className="btn-luxury" style={{ padding: '1rem 2rem' }} onClick={() => {
                  window.location.href = process.env.NEXT_PUBLIC_WEB_URL ? `${process.env.NEXT_PUBLIC_WEB_URL}/login` : 'http://localhost:3001/login';
                }}>
                  Log in as Staff →
                </button>
              </div>
            )}
          </>
        )}

        {/* BOARD (STUDENT ONLY) */}
        {role === 'Student' && (
          <div className="card fade-up" style={{ marginBottom: '1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
            <div className="section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              Step 02 — Curriculum Board
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            <div className="select-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.4rem' }}>
              {['CBSE', 'ICSE', 'State Boards', 'IB / Cambridge'].map(b => (
                <button key={b} className={`sel-btn ${board === b ? 'active' : ''}`} onClick={() => {
                  setBoard(b);
                  if (b !== 'State Boards') setStateBoard(null); // Reset sub-state if they click away
                }}>
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SUB-BOARD: STATE SELECTION */}
        {board === 'State Boards' && (
          <div className="card fade-up" style={{ marginBottom: '1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
            <div className="section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              Step 02B — Select State
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            <div className="select-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.4rem' }}>
              {['Maharashtra', 'Uttar Pradesh', 'Gujarat'].map(s => (
                <button key={s} className={`sel-btn ${stateBoard === s ? 'active' : ''}`} onClick={() => setStateBoard(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {((board && board !== 'State Boards') || (board === 'State Boards' && stateBoard)) && (
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.2rem' }}>
            
            {/* GRADE */}
            <div className="card fade-up" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
              <div className="section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                Step 03 — Grade
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>
              <div className="grade-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))', gap: '0.5rem', marginTop: '0.4rem' }}>
                {['1–5', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'].map(g => (
                  <button key={g} className={`grade-btn ${grade === g ? 'active' : ''}`} onClick={() => setGrade(g)}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* LANGUAGE */}
            {grade && (
              <div className="card fade-up" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', position: 'relative', overflow: 'hidden' }}>
                <div className="section-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  Step 04 — Language
                  <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                </div>
                <div className="lang-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem', marginTop: '0.4rem' }}>
                   {[
                    { n: 'English', e: 'English' },
                    { n: 'हिन्दी', e: 'Hindi' },
                    { n: 'मराठी', e: 'Marathi' },
                    { n: 'ગુજરાતી', e: 'Gujarati' },
                    { n: 'संस्कृतम्', e: 'Sanskrit' }
                  ].map(l => (
                    <button key={l.e} className={`lang-btn ${lang === l.n ? 'active' : ''}`} onClick={() => setLang(l.n)}>
                      <span className="lang-native">{l.n}</span>
                      <span className="lang-en">{l.e}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        {lang && (
          <div className="cta-wrap fade-up" style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <button className="cta-btn btn-luxury" onClick={handleEnterWorkspace}>
              Enter Sovereign Workspace →
            </button>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              Free to start · No UPI or credit card needed
            </div>
          </div>
        )}

      </main>

      {/* STATUS */}
      <div className="status-row fade-up delay-6" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginTop: '3rem', marginBottom: '3rem' }}>
        <div className="status-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          <div className="dot green" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4caf82', boxShadow: '0 0 6px #4caf82', animation: 'pulse 2s infinite' }}></div> NCERT Verified
        </div>
        <div className="status-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          <div className="dot gold" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 6px var(--gold)', animation: 'pulse 2s infinite' }}></div> Neural Engines Active
        </div>
        <div className="status-item" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          <div className="dot blue" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5b8dee', boxShadow: '0 0 6px #5b8dee', animation: 'pulse 2s infinite' }}></div> Digital Sovereignty
        </div>
      </div>

    </div>
  );
}
