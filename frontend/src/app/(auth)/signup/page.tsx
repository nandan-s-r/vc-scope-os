'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: fullName }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Signup failed');
      }

      const data = await res.json();
      login(data.access_token, data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1 className="mono" style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          VC SCOPE OS
        </h1>
        <p className="mono text-muted" style={{ fontSize: '12px' }}>
          Initialize a new partner terminal.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {error && (
          <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-red)', borderRadius: '6px', color: 'var(--accent-red)', fontSize: '13px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label className="mono text-secondary" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>FULL NAME</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="input-field"
            placeholder="Jane Doe"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label className="mono text-secondary" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
            placeholder="partner@firm.com"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label className="mono text-secondary" style={{ fontSize: '11px', letterSpacing: '0.05em' }}>PASSWORD</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '8px', padding: '12px' }}>
          {loading ? 'PROVISIONING...' : 'INITIALIZE ACCOUNT'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <span className="mono text-muted" style={{ fontSize: '12px' }}>Existing partner? </span>
          <Link href="/login" className="mono" style={{ fontSize: '12px', color: 'var(--accent-blue)', textDecoration: 'none' }}>
            Access Terminal
          </Link>
        </div>
        <div>
          <Link href="/privacy" className="mono text-muted" style={{ fontSize: '11px', textDecoration: 'underline' }}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </>
  );
}
