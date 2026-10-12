(() => {
 const level=location.pathname.includes('minor-works')?'minor':'major';
 const root=document.querySelector('#catalogProjects');
 const projects=(window.portfolioProjects||[]).filter(p=>p.level===level);
 const snippets=window.portfolioSnippets||{};
 function el(tag,cl,text){const n=document.createElement(tag);if(cl)n.className=cl;if(text!==undefined)n.textContent=text;return n}
 const viewer=document.querySelector('#imageViewer');
 document.querySelector('.viewer-close')?.addEventListener('click',()=>viewer.close());
 viewer?.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
 for(const project of projects){
  const article=el('article','catalog-project');article.id=project.id;
  const head=el('div','catalog-project-heading');
  const title=el('div');title.append(el('p','eyebrow',project.level==='major'?'FEATURED SYSTEM':'UI EXPERIMENT'),el('h2','',project.name),el('p','catalog-description',project.desc));
  const link=el('a','pill ghost','View repository ↗');link.href=project.url;link.target='_blank';link.rel='noopener noreferrer';head.append(title,link);
  const gallery=el('div','catalog-gallery');
  project.screenshots.forEach((shot,index)=>{const btn=el('button','catalog-shot');btn.type='button';btn.setAttribute('aria-label','Enlarge '+shot.caption);const img=el('img');img.src=shot.src;img.alt=shot.caption;img.loading=index?'lazy':'eager';const caption=el('span','',shot.caption);btn.append(img,caption);btn.addEventListener('click',()=>{viewer.querySelector('img').src=shot.src;viewer.querySelector('img').alt=shot.caption;viewer.querySelector('p').textContent=shot.caption;viewer.showModal()});gallery.append(btn)});
  const meta=el('div','catalog-metadata');meta.append(el('p','',project.features));const tags=el('div','skill-cloud');project.tags.forEach(tag=>tags.append(el('span','',tag)));meta.append(tags);
  const snippet=snippets[project.id];const source=el('div','code-feature');source.append(el('div','code-heading','CODE SNAPSHOT · '+(snippet?.path||'Source')));
  if(snippet){const pre=el('pre');const code=el('code');code.textContent=snippet.source;pre.append(code);source.append(pre);const sourceLink=el('a','source-link','Open original file on GitHub ↗');sourceLink.href=snippet.url;sourceLink.target='_blank';sourceLink.rel='noopener noreferrer';source.append(sourceLink)}
  article.append(head,gallery,meta,source);root.append(article);
 }
 if(!projects.length)root.append(el('p','', 'New project showcases will appear here.'));
 // Let each long project section ease into view once, without delaying content for reduced-motion users.
 if (projects.length && 'IntersectionObserver' in window &&
     !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
  const observer = new IntersectionObserver((entries, instance) => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
     entry.target.classList.add('is-revealed');
     instance.unobserve(entry.target);
    }
   });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  root.classList.add('catalog-scroll-ready');
  root.querySelectorAll('.catalog-project').forEach(article => observer.observe(article));
 }
})();