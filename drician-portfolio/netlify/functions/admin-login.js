const { json, safeEqual, signToken } = require('./lib/common');
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  try {
    const body = JSON.parse(event.body || '{}');
    const ok = safeEqual(body.username, process.env.ADMIN_USERNAME) && safeEqual(body.password, process.env.ADMIN_PASSWORD);
    if (!ok) return json(401, { error: 'Invalid username or password' });
    const token = signToken({ user: process.env.ADMIN_USERNAME, exp: Date.now() + 8 * 60 * 60 * 1000 });
    return json(200, { ok: true }, { 'Set-Cookie': `portfolio_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800` });
  } catch (e) { console.error(e); return json(500, { error: 'Login is not configured' }); }
};
