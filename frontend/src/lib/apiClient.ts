// In production (Vercel), NEXT_PUBLIC_API_BASE is set to the Render backend URL.
// In local dev, fall back to localhost.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  // Ensure endpoint starts with a slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${path}`;

  const headers = new Headers(options.headers || {});
  
  // Attach token if exists in localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('vc_os_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  // Set default content type to JSON if not provided and not a FormData request
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Handle unauthorized: clear token and redirect to login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vc_os_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch (e) {
      errorMessage = await response.text();
    }
    throw new Error(errorMessage);
  }

  // Handle empty responses
  if (response.status === 204) {
    return null;
  }

  return response.json();
}
