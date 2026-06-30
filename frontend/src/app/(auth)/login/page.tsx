'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiBase}/api/auth/login`, {
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
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="••••••••"
              style={{ width: '100%', paddingRight: '40px' }}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '4px'
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: '-8px' }}>
          <button type="button" onClick={() => alert('Password reset is disabled in this environment. Please contact your Fund Administrator.')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '11px', cursor: 'pointer', padding: 0, textDecoration: 'underline' }} className="mono">Forgot password?</button>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '4px', padding: '12px' }}>
          {loading ? 'AUTHENTICATING...' : 'ACCESS TERMINAL'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>
          <span className="mono text-muted" style={{ fontSize: '12px' }}>New partner? </span>
          <Link href="/signup" className="mono" style={{ fontSize: '12px', color: 'var(--accent-blue)', textDecoration: 'none' }}>
            Provision Account
          </Link>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link href="/privacy" className="mono text-muted" style={{ fontSize: '11px', textDecoration: 'underline' }}>Privacy</Link>
          <Link href="/terms" className="mono text-muted" style={{ fontSize: '11px', textDecoration: 'underline' }}>Terms</Link>
          <Link href="/cookies" className="mono text-muted" style={{ fontSize: '11px', textDecoration: 'underline' }}>Cookies</Link>
        </div>
      </div>
    </>
  );
}
