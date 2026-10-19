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
  target.scrollIntoView({block:'start',behavior:reducedMotion()?'auto':behavior});
 };
 toggle.addEventListener('click',()=>nav.classList.contains('is-open')?close():open());
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));

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

 window.addEventListener('load',()=>{
  if(!window.location.hash)return;
  requestAnimationFrame(()=>alignHash('auto'));
  if(document.fonts?.ready)document.fonts.ready.then(()=>alignHash('auto')).catch(()=>{});
 });

 // Homepage demo reel: use the full-quality MP4 directly.
 const homepage=document.querySelector('main#top');
 if(homepage && document.querySelector('.hero.hero-centered') && !document.querySelector('.demo-reel-section')){
  if(!document.querySelector('link[href="demo-reel.css"]')){
   const stylesheet=document.createElement('link');
   stylesheet.rel='stylesheet';
   stylesheet.href='demo-reel.css';
   document.head.appendChild(stylesheet);
  }

  const section=document.createElement('section');
  section.className='demo-reel-section reveal';
  section.setAttribute('aria-labelledby','demoReelTitle');
  section.innerHTML=`
   <div class="demo-reel-copy">
    <p class="eyebrow">DEMO REEL</p>
    <h2 id="demoReelTitle">A quick look at my work in action.</h2>
    <p>This short reel highlights selected projects and interfaces from my portfolio, showing how I approach practical software, automation, and user-focused development.</p>
   </div>
   <div class="demo-reel-frame">
    <video controls playsinline preload="metadata" width="1280" height="720" aria-label="BlimpMac portfolio demo reel">
     <source src="assets/demo-reel.mp4" type="video/mp4">
     Your browser does not support HTML5 video.
    </video>
   </div>`;
  homepage.prepend(section);
  requestAnimationFrame(()=>section.classList.add('visible'));
 }
})();