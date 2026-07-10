const crypto = require('crypto');
const { json, supabaseHeaders, supabaseUrl } = require('./lib/common');
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  try {
    const body = JSON.parse(event.body || '{}');
    const visitorId = String(body.visitorId || '').slice(0, 120);
    if (!visitorId) return json(400, { error: 'Missing visitor ID' });
    const ua = String(event.headers['user-agent'] || '').slice(0, 500);
    const visitorHash = crypto.createHash('sha256').update(`${visitorId}:${process.env.VISITOR_HASH_SALT || 'portfolio'}`).digest('hex');
    const record = { visitor_hash: visitorHash, path: String(body.path || '/').slice(0, 300), referrer: String(body.referrer || '').slice(0, 500), user_agent: ua };
    const r = await fetch(supabaseUrl('portfolio_views'), { method: 'POST', headers: supabaseHeaders('return=minimal'), body: JSON.stringify(record) });
    if (!r.ok) throw new Error(await r.text());
    return json(200, { ok: true });
  } catch (e) { console.error(e); return json(500, { error: 'Tracking unavailable' }); }
};
