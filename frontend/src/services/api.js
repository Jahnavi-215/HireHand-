const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000';

function getStoredAuth() {
  try { return JSON.parse(localStorage.getItem('auth')) || null; } catch { return null; }
}

function setStoredAuth(auth) {
  if (!auth) localStorage.removeItem('auth');
  else localStorage.setItem('auth', JSON.stringify(auth));
}

// cookie-based refresh: call /auth/refresh with credentials included
async function refreshToken() {
  const res = await fetch(`${API_BASE}/auth/refresh`, { method: 'POST', credentials: 'include' });
  if (!res.ok) throw new Error('Refresh failed');
  const data = await res.json();
  const auth = getStoredAuth() || {};
  const newAuth = { ...auth, accessToken: data.accessToken, user: data.user };
  setStoredAuth(newAuth);
  return newAuth;
}

async function request(path, options = {}, retry = true) {
  const auth = getStoredAuth();
  const headers = new Headers(options.headers || {});
  if (auth && auth.accessToken) headers.set('Authorization', `Bearer ${auth.accessToken}`);
  // include credentials so httpOnly cookies (refresh token) are sent
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers, credentials: 'include' });

  if (res.status === 401 && retry) {
    try {
      const newAuth = await refreshToken();
      headers.set('Authorization', `Bearer ${newAuth.accessToken}`);
      const retryRes = await fetch(`${API_BASE}${path}`, { ...options, headers, credentials: 'include' });
      if (!retryRes.ok) {
        const contentType = retryRes.headers.get('content-type') || '';
        const err = contentType.includes('application/json') ? await retryRes.json() : { error: retryRes.statusText };
        throw err;
      }
      const contentType = retryRes.headers.get('content-type') || '';
      return contentType.includes('application/json') ? retryRes.json() : retryRes.text();
    } catch (err) {
      // refresh failed -> clear auth
      setStoredAuth(null);
      throw err;
    }
  }

  const contentType = res.headers.get('content-type') || '';
  if (!res.ok) {
    const err = contentType.includes('application/json') ? await res.json() : { error: res.statusText };
    throw err;
  }
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

export async function register({ name, email, password }) {
  return request('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
}

export async function login({ email, password }) {
  // login will set httpOnly refresh cookie; we include credentials
  const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }), credentials: 'include' });
  if (!res.ok) {
    const ct = res.headers.get('content-type') || '';
    const err = ct.includes('application/json') ? await res.json() : { error: res.statusText };
    throw err;
  }
  const data = await res.json();
  // store accessToken and user, refresh is in cookie
  const auth = { accessToken: data.accessToken, user: data.user };
  setStoredAuth(auth);
  return auth;
}

export async function logout() {
  try {
    // server will clear httpOnly cookie
  await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
  } catch (e) {
    // ignore
  }
  setStoredAuth(null);
}

export async function postJob({ title, description, location, budget }) {
  return request('/jobs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, description, location, budget }) });
}

export async function listJobs() {
  return request('/jobs');
}

// list jobs with optional query params: { q, location, page, pageSize }
export async function listJobsWithParams(params = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set('q', params.q);
  if (params.location) qs.set('location', params.location);
  if (params.page) qs.set('page', String(params.page));
  if (params.pageSize) qs.set('pageSize', String(params.pageSize));
  const suffix = qs.toString() ? `?${qs.toString()}` : '';
  return request(`/jobs${suffix}`);
}
