const { json, requireAdmin, supabaseHeaders, supabaseUrl } = require('./lib/common');
exports.handler = async (event) => {
  if (!requireAdmin(event)) return json(401, { error: 'Unauthorized' });
  try {
    const [viewsRes, feedbackRes] = await Promise.all([
      fetch(supabaseUrl('portfolio_views?select=created_at,visitor_hash,path,referrer&order=created_at.desc&limit=10000'), { headers: supabaseHeaders() }),
      fetch(supabaseUrl('portfolio_feedback?select=created_at,rating,comment,name&order=created_at.desc&limit=500'), { headers: supabaseHeaders() })
    ]);
    if (!viewsRes.ok || !feedbackRes.ok) throw new Error('Database request failed');
    const views = await viewsRes.json(); const feedback = await feedbackRes.json();
    const today = new Date().toISOString().slice(0,10);
    const unique = new Set(views.map(v => v.visitor_hash)).size;
    const avgRating = feedback.length ? feedback.reduce((a,b)=>a+Number(b.rating||0),0)/feedback.length : 0;
    const dailyMap = {};
    views.forEach(v => { const d = String(v.created_at).slice(0,10); dailyMap[d]=(dailyMap[d]||0)+1; });
    const daily = Array.from({length:14},(_,i)=>{ const d=new Date(); d.setUTCDate(d.getUTCDate()-(13-i)); const key=d.toISOString().slice(0,10); return {date:key,count:dailyMap[key]||0}; });
    return json(200, { totalViews: views.length, uniqueVisitors: unique, todayViews: dailyMap[today]||0, avgRating: Number(avgRating.toFixed(1)), ratingCount: feedback.length, daily, recentFeedback: feedback.slice(0,25) });
  } catch (e) { console.error(e); return json(500, { error: 'Analytics unavailable' }); }
};
