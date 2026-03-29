'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function LoginPage() {
  const [profile, setProfile] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'phone' | 'email'>('phone');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // OTP Verification States
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [otpCode, setOtpCode] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('prathamone_guest_profile');
      if (stored) setProfile(JSON.parse(stored));
    } catch(e) {}
  }, []);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (authMode === 'phone') {
        const { error } = await supabase.auth.signInWithOtp({
          phone: `+91${mobileNumber}`,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email: emailAddress,
        });
        if (error) throw error;
      }
      setStep('verify');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send secure code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: authMode === 'phone' ? `+91${mobileNumber}` : undefined,
        email: authMode === 'email' ? emailAddress : undefined,
        token: otpCode,
        type: authMode === 'phone' ? 'sms' : 'email',
      });

      if (error) throw error;

      // Upon successful auth, persist the active guest profile to their verified account
      if (profile && data.user) {
        const { error: upsertError } = await supabase
          .from('Sovereign_Profiles') // NOTE: Replace with exact DB table name if different
          .upsert({
            id: data.user.id,
            role: profile.role,
            board: profile.board,
            state_board: profile.stateBoard,
            grade: profile.grade,
            preferred_language: profile.lang,
            updated_at: new Date().toISOString()
          });
        
        if (upsertError) console.error('Silent Profile Sync Error:', upsertError);
      }

      // Route to the retention dashboard
      window.location.href = '/dashboard';

    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid verification code. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100dvh', background: 'var(--deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="card fade-up" style={{ width: '100%', maxWidth: '440px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '3.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Decorative Grid Behind */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(201,168,76,0.05), transparent)', zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-brand)', color: 'var(--text)' }}>Sovereign Auth</h1>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--gold-light)', marginBottom: '0.5rem' }}>
            {profile?.role === 'Student' ? `Save your ${profile.board || ''} Curriculum` : 'Secure Platform Access'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2.5rem', lineHeight: '1.5' }}>
            {profile?.role === 'Student' 
              ? `You're making great progress in Grade ${profile.grade || ''}. Log in to permanently save your interactions and unlock full NCERT analytics.` 
              : 'Enter your credentials to manage your institutional or parent dashboard.'}
          </p>

          {errorMsg && (
            <div style={{ background: 'rgba(255,50,50,0.1)', color: '#ff6b6b', padding: '0.8rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid rgba(255,50,50,0.2)' }}>
              {errorMsg}
            </div>
          )}

          {step === 'request' ? (
            <>
              <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <button 
                  onClick={() => setAuthMode('phone')}
                  style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', background: authMode === 'phone' ? 'var(--surface)' : 'transparent', color: authMode === 'phone' ? 'var(--gold)' : 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Phone / OTP
                </button>
                <button 
                  onClick={() => setAuthMode('email')}
                  style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', background: authMode === 'email' ? 'var(--surface)' : 'transparent', color: authMode === 'email' ? 'var(--gold)' : 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Email Sign In
                </button>
              </div>

              <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                
                {authMode === 'phone' ? (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Mobile Number</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{ padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-muted)' }}>+91</div>
                      <input 
                        type="tel" 
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="98765 43210" 
                        required 
                        style={{ flex: 1, padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }} 
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="scholar@example.com" 
                      required 
                      style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', outline: 'none' }} 
                    />
                  </div>
                )}

                <button type="submit" className="btn-luxury" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }} disabled={loading}>
                  {loading ? 'Requesting Secure Code...' : 'Send Secure OTP →'}
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Enter the 6-digit code sent to {authMode === 'phone' ? `+91 ${mobileNumber}` : emailAddress}
                </label>
                <input 
                  type="text" 
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="000000" 
                  required 
                  maxLength={6}
                  style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.4)', border: '1px dashed var(--gold)', borderRadius: '8px', color: 'var(--gold-light)', outline: 'none', textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.2em', fontFamily: 'var(--font-mono)' }} 
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep('request')} style={{ padding: '1rem', flex: 1, background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Back
                </button>
                <button type="submit" className="btn-luxury" style={{ flex: 2, padding: '1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }} disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify & Enter Workspace'}
                </button>
              </div>
            </form>
          )}

          <div style={{ marginTop: '2.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            By continuing, you accept the Sovereign Network <br/>
            <a href="#" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Terms of Service</a> & <a href="#" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </main>
  );
}
