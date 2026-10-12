(() => {
 const nav=document.querySelector('#siteNav');
 const toggle=document.querySelector('.menu');
 if(!nav || !toggle) return;

 const close=()=>{
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Open navigation');
  toggle.textContent='☰';
 };
 const open=()=>{
  nav.classList.add('is-open');
  toggle.setAttribute('aria-expanded','true');
  toggle.setAttribute('aria-label','Close navigation');
  toggle.textContent='×';
 };
 const reducedMotion=()=>!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const targetFromHash=(hash)=>{
  if(!hash || hash==='#')return null;
  try{return document.getElementById(decodeURIComponent(hash.slice(1)));}
  catch{return null;}
 };
 const alignHash=(behavior='auto')=>{
  const target=targetFromHash(window.location.hash);
  if(!target)return;
  // CSS scroll-margin-top and internal section padding keep headings below the fixed header.
  target.scrollIntoView({block:'start',behavior:reducedMotion()?'auto':behavior});
 };
 toggle.addEventListener('click',()=>nav.classList.contains('is-open')?close():open());
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));

 // Handle all on-page anchors, including Explore Projects, without leaving a heading under the header.
 document.addEventListener('click',event=>{
  const link=event.target.closest?.('a[href^="#"]');
  if(!link || event.defaultPrevented || event.button!==0 ||
     event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)return;
  const hash=link.getAttribute('href');
  const target=targetFromHash(hash);
  if(!target)return;
  event.preventDefault();
  close();
  if(window.location.hash!==hash)window.history.pushState(null,'',hash);
  target.scrollIntoView({block:'start',behavior:reducedMotion()?'auto':'smooth'});
 });
 document.addEventListener('click',event=>{
  if(!nav.contains(event.target) && !toggle.contains(event.target))close();
 });
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&nav.classList.contains('is-open')){close();toggle.focus();}
 });
 window.addEventListener('resize',()=>{if(window.innerWidth>900)close();});
 window.addEventListener('hashchange',()=>alignHash('auto'));
 window.addEventListener('popstate',()=>alignHash('auto'));

 // Direct links from a different page can initially scroll before fonts and layout finish.
 // Re-align after loading so the requested section starts in the expected position.
 window.addEventListener('load',()=>{
  if(!window.location.hash)return;
  requestAnimationFrame(()=>alignHash('auto'));
  if(document.fonts?.ready)document.fonts.ready.then(()=>alignHash('auto')).catch(()=>{});
 });
})();