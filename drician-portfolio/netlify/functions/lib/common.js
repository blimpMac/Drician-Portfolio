const crypto = require('crypto');

function json(statusCode, body, headers = {}) {
  return { statusCode, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }, body: JSON.stringify(body) };
}
function safeEqual(a = '', b = '') {
  const aa = Buffer.from(String(a)); const bb = Buffer.from(String(b));
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}
function b64url(input) { return Buffer.from(input).toString('base64url'); }
function signToken(payload) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  const data = b64url(JSON.stringify(payload));
  const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url');
  return `${data}.${sig}`;
}
function verifyToken(token) {
  try {
    const [data, sig] = String(token || '').split('.');
    if (!data || !sig) return null;
    const expected = crypto.createHmac('sha256', process.env.ADMIN_SESSION_SECRET).update(data).digest('base64url');
    if (!safeEqual(sig, expected)) return null;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch { return null; }
}
function getCookie(event, name) {
  const raw = event.headers.cookie || event.headers.Cookie || '';
  const pair = raw.split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`));
  return pair ? decodeURIComponent(pair.slice(name.length + 1)) : '';
}
function requireAdmin(event) { return verifyToken(getCookie(event, 'portfolio_admin')); }
function supabaseHeaders(prefer = '') {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  return { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(prefer ? { Prefer: prefer } : {}) };
}
function supabaseUrl(path) {
  const base = process.env.SUPABASE_URL;
  if (!base) throw new Error('SUPABASE_URL is not configured');
  return `${base.replace(/\/$/, '')}/rest/v1/${path}`;
}
module.exports = { json, safeEqual, signToken, requireAdmin, supabaseHeaders, supabaseUrl };
