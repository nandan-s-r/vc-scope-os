'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const res = await fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Login failed');
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
          Restricted access. Authorized personnel only.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {error && (
          <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-red)', borderRadius: '6px', color: 'var(--accent-red)', fontSize: '13px', textAlign: 'center' }}>
            {error}
          </div>
        )}
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
          {loading ? 'AUTHENTICATING...' : 'ACCESS TERMINAL'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '8px' }}>
        <span className="mono text-muted" style={{ fontSize: '12px' }}>New partner? </span>
        <Link href="/signup" className="mono" style={{ fontSize: '12px', color: 'var(--accent-blue)', textDecoration: 'none' }}>
          Provision Account
        </Link>
      </div>
    </>
  );
}
