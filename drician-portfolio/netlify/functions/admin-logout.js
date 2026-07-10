const { json } = require('./lib/common');
exports.handler = async () => json(200, { ok: true }, { 'Set-Cookie': 'portfolio_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0' });
