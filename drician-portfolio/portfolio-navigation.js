(() => {
 const nav=document.querySelector('#siteNav'), toggle=document.querySelector('.menu');
 if (!nav || !toggle) return;
 const close=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.textContent='☰';};
 const open=()=>{nav.classList.add('is-open');toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','Close navigation');toggle.textContent='×';};
 toggle.addEventListener('click',()=>nav.classList.contains('is-open')?close():open());
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
 document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!toggle.contains(event.target))close()});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('is-open')){close();toggle.focus()}});
 window.addEventListener('resize',()=>{if(window.innerWidth>900)close()});
})();