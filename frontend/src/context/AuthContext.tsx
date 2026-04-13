'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Global Fetch Interceptor to automatically append the Bearer auth token for API calls
if (typeof window !== 'undefined' && !(window as any).__fetch_intercepted) {
  (window as any).__fetch_intercepted = true;
  const originalFetch = window.fetch;
  window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
    const url = typeof input === 'string' ? input : (input instanceof URL ? input.toString() : (input as any).url || '');
    if (url.includes('127.0.0.1:8000') || url.includes('localhost:8000') || url.startsWith('/api')) {
      const token = localStorage.getItem('vc_os_token');
      if (token) {
        init = init || {};
        const headers = new Headers(init.headers || {});
        if (!headers.has('Authorization')) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        init.headers = headers;
      }
    }
    return originalFetch(input, init);
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage on mount
    const storedToken = localStorage.getItem('vc_os_token');
    if (storedToken) {
      setToken(storedToken);
      // Fetch user profile to verify token
      fetch('http://127.0.0.1:8000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Token invalid');
      })
      .then(data => {
        setUser({ email: data.email, name: data.name });
      })
      .catch(() => {
        localStorage.removeItem('vc_os_token');
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Protect routes
    if (!isLoading && !token && !pathname.startsWith('/login') && !pathname.startsWith('/signup')) {
      router.push('/login');
    }
  }, [token, isLoading, pathname, router]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('vc_os_token', newToken);
    setToken(newToken);
    setUser(newUser);
    router.push('/'); // Redirect to dashboard
  };

  const logout = () => {
    localStorage.removeItem('vc_os_token');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {isLoading ? (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '12px' }}>
          SECURE PROTOCOL INITIALIZATION...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
