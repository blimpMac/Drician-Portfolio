const crypto = require('crypto');
const { json, supabaseHeaders, supabaseUrl } = require('./lib/common');
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  try {
    const body = JSON.parse(event.body || '{}');
    const rating = Number(body.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) return json(400, { error: 'Choose a rating from 1 to 5' });
    const visitorId = String(body.visitorId || '').slice(0, 120);
    const visitorHash = visitorId ? crypto.createHash('sha256').update(`${visitorId}:${process.env.VISITOR_HASH_SALT || 'portfolio'}`).digest('hex') : null;
    const record = { rating, comment: String(body.comment || '').trim().slice(0, 1200), name: String(body.name || '').trim().slice(0, 100), visitor_hash: visitorHash };
    const r = await fetch(supabaseUrl('portfolio_feedback'), { method: 'POST', headers: supabaseHeaders('return=minimal'), body: JSON.stringify(record) });
    if (!r.ok) throw new Error(await r.text());
    return json(200, { ok: true });
  } catch (e) { console.error(e); return json(500, { error: 'Feedback could not be saved' }); }
};
