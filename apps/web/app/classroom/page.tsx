'use client';

import React, { useState, useEffect } from 'react';

export default function ClassroomPage() {
  const [profile, setProfile] = useState<any>(null);
  const [step, setStep] = useState<'subject' | 'topic' | 'lesson'>('subject');
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [interactions, setInteractions] = useState(0);
  const [isAuthLocked, setIsAuthLocked] = useState(false);

  useEffect(() => {
    // Hydrate Context from Marketing Guest Onboarding
    try {
      const stored = localStorage.getItem('prathamone_guest_profile');
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        // Fallback for direct links
        setProfile({ board: 'Unknown', grade: 'Unknown' });
      }
    } catch(e) {}
  }, []);

  // Growth Engine Trigger
  const handleAILessonInteraction = () => {
    if (interactions >= 2) {
      setIsAuthLocked(true);
    } else {
      setInteractions(prev => prev + 1);
    }
  };

  const navPath = [
    { label: profile ? `${profile.stateBoard || profile.board} — Grade ${profile.grade}` : 'Loading...', step: 'subject' },
    activeSubject ? { label: activeSubject, step: 'topic' } : null,
    activeTopic ? { label: activeTopic, step: 'lesson' } : null
  ].filter(Boolean);

  return (
    <main style={{ minHeight: '100dvh', padding: '4rem 2rem', background: 'var(--background)', color: 'var(--text)', position: 'relative' }}>
      
      {/* AUTH SMART-LOCK (CONVERSION POINT) */}
      {isAuthLocked && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card fade-up" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '3.5rem', textAlign: 'center', maxWidth: '460px', width: '90%' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--gold-light)', marginBottom: '0.8rem' }}>
              Unlock the Premium AI Tutor
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
              You've experienced a glimpse of Sovereign AI. While the core curriculum remains <b>Free & Offline Enabled</b> forever, you need a <b>Premium Subscription</b> to continue engaging with the neural AI Tutor.
            </p>
            <button className="btn-luxury" style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }} onClick={() => {
              window.location.href = '/login';
            }}>
              Authenticate & Upgrade
            </button>
            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', fontSize: '0.85rem', cursor: 'pointer' }} onClick={() => setIsAuthLocked(false)}>
              Return to Free Learning
            </button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* BREADCRUMB */}
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3rem' }}>
          {navPath.map((item: any, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span style={{ opacity: 0.5 }}>/</span>}
              <button 
                style={{ background: 'none', border: 'none', color: idx === navPath.length - 1 ? 'var(--gold)' : 'var(--text-muted)', cursor: 'pointer' }}
                onClick={() => setStep(item.step)}
              >
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1: SUBJECT SELECTION */}
        {step === 'subject' && (
          <div className="fade-up">
            <h1 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '2rem' }}>Select your Subject</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {['Mathematics', 'Science', 'Social Science', 'English'].map(sub => (
                <div key={sub} className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => { setActiveSubject(sub); setStep('topic'); }}>
                  <h3 style={{ fontSize: '1.4rem' }}>{sub}</h3>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>14 Modules available</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: TOPIC SELECTION */}
        {step === 'topic' && (
          <div className="fade-up">
            <h1 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '2rem' }}>Chapters in {activeSubject}</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {['Introduction & Fundamentals', 'Advanced Problem Solving', 'Conceptual Architecture', 'Doubt Clarification Session'].map((topic, i) => (
                <div key={i} className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem 2rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => { setActiveTopic(topic); setStep('lesson'); }}>
                  <div style={{ fontSize: '1.2rem' }}>{i+1}. {topic}</div>
                  <div style={{ color: 'var(--gold)' }}>Begin →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: MOCK AI LESSON */}
        {step === 'lesson' && (
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 600px), 1fr))', gap: '2rem' }}>
            
            {/* Main Content Area */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '3rem', minHeight: '60vh', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '6px', height: '6px', background: '#4caf50', borderRadius: '50%' }}></div>
                Free Learning (Offline Enabled)
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--gold-light)' }}>{activeTopic}</h2>
              <div style={{ color: 'var(--text)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                <p style={{ marginBottom: '1rem' }}>The fundamental principles of this topic dictate the core structure of the {profile?.board} curriculum. Active studying focuses deeply on systematic integration and memory retention.</p>
                <p>This text content is entirely free and cached seamlessly to your local device for offline reading across Bharat.</p>
              </div>
              
              <div className="card" style={{ padding: '2rem', background: 'rgba(201,168,76,0.05)', border: '1px dashed var(--gold)', borderRadius: '12px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '2rem', background: 'var(--deep)', padding: '0 0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>⭐ Premium AI Tutor</span>
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', marginTop: '0.5rem' }}>Stuck on a concept? Engage the neural assistant for instant personalized breakdown and dynamic practice generation.</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-luxury" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem' }} onClick={handleAILessonInteraction}>Ask AI Explanation</button>
                  <button className="btn-luxury" style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', background: 'transparent' }} onClick={handleAILessonInteraction}>Generate Practice Question</button>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold)', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem' }}>Free AI Doubts Remaining</div>
                <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden', marginBottom: '1rem' }}>
                  <div style={{ height: '100%', width: `${((3 - interactions) / 3) * 100}%`, background: interactions >= 2 ? '#ff6b6b' : 'var(--gold)', transition: 'width 0.4s, background 0.4s' }} />
                </div>
                <div style={{ fontSize: '0.85rem', color: interactions >= 2 ? '#ff6b6b' : 'var(--text-muted)' }}>
                  {3 - interactions} doubt{3 - interactions !== 1 ? 's' : ''} remaining on free plan
                </div>
                {interactions >= 1 && (
                  <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(201,168,76,0.05)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    ⭐ Upgrade to Premium for unlimited AI Tutor access
                  </div>
                )}
              </div>

              <div className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#4caf50', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '6px', height: '6px', background: '#4caf50', borderRadius: '50%' }}></div>
                  Offline Ready
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>This lesson content is cached to your device. Available even without internet.</div>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
