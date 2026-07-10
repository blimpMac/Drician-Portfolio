const fallback=[
{name:'React MessengerStyle',desc:'A messenger-style web interface focused on responsive UI and component-based front-end development.',url:'https://github.com/blimpMac/React-MessengerStyle',tags:['React','JavaScript','UI'],cat:'web',glow:'#6f8cff'},
{name:'Faculty In-and-Out System',desc:'A Python-based monitoring system for recording faculty attendance and movement.',url:'https://github.com/blimpMac/PythonFinals',tags:['Python','Desktop','Monitoring'],cat:'system',glow:'#64e3c3'},
{name:'Digital Survey System',desc:'An ASP.NET project supporting survey workflows, database operations, and structured data collection.',url:'https://github.com/blimpMac/FinalProjectForASPNET',tags:['ASP.NET','MSSQL','Web'],cat:'web',glow:'#a77bff'},
{name:'BlockGO',desc:'A blockchain-oriented grading system developed as a capstone project, with backend and testing contributions.',url:'https://github.com/blimpMac/Capstone-Project-BlockChain-BlockGo',tags:['Blockchain','Backend','Capstone'],cat:'blockchain',glow:'#ff9f72'}];
let projects=fallback;
function render(filter='all'){const root=document.querySelector('#projects');root.innerHTML='';projects.filter(p=>filter==='all'||p.cat===filter).forEach((p,i)=>{const a=document.createElement('a');a.className='project-card';a.href=p.url;a.target='_blank';a.rel='noreferrer';a.style.setProperty('--glow',p.glow||'#6f8cff');a.innerHTML=`<span class="num">0${i+1} / FEATURED</span><h3>${p.name}</h3><p>${p.desc}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><span class="arrow">↗</span>`;root.appendChild(a)})}
render();
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)});
fetch('https://api.github.com/users/blimpMac/repos?per_page=100&sort=updated').then(r=>r.ok?r.json():Promise.reject()).then(data=>{document.querySelector('#repoCount').textContent=data.length+'+'}).catch(()=>{});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
window.addEventListener('mousemove',e=>{const g=document.querySelector('.cursor-glow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
const tilt=document.querySelector('.tilt');tilt?.addEventListener('mousemove',e=>{const r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`});tilt?.addEventListener('mouseleave',()=>tilt.style.transform='');

const documents={
 resume:{title:'OJT Resume Preview',pdf:'documents/pdf/Drician-Cordon-Resume.pdf',docx:'documents/Drician-Cordon-Resume.docx'},
 cv:{title:'Professional CV Preview',pdf:'documents/pdf/Drician-Cordon-Professional-CV.pdf',docx:'documents/Drician-Cordon-Professional-CV.docx'}
};
const previewModal=document.querySelector('#previewModal');
const contactModal=document.querySelector('#contactModal');
function openModal(modal){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');modal.querySelector('.modal-close')?.focus()}
function closeModal(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');if(modal===previewModal)document.querySelector('#previewFrame').src='about:blank'}
document.querySelectorAll('.open-preview').forEach(button=>button.addEventListener('click',()=>{const doc=documents[button.dataset.document];document.querySelector('#previewTitle').textContent=doc.title;document.querySelector('#previewFrame').src=doc.pdf+'#toolbar=1&navpanes=0&view=FitH';document.querySelector('#previewDownloadPdf').href=doc.pdf;document.querySelector('#previewDownloadDocx').href=doc.docx;openModal(previewModal)}));
document.querySelectorAll('.open-contact').forEach(button=>button.addEventListener('click',()=>openModal(contactModal)));
document.querySelectorAll('[data-close-modal]').forEach(button=>button.addEventListener('click',()=>closeModal(button.closest('.modal'))));
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.modal.open').forEach(closeModal)});

// Privacy-conscious visitor tracking. A random browser ID is hashed on the server;
// the website never stores a visitor's raw identifier or IP address.
function getVisitorId(){
  let id=localStorage.getItem('portfolioVisitorId');
  if(!id){id=(crypto.randomUUID?crypto.randomUUID():`${Date.now()}-${Math.random()}`);localStorage.setItem('portfolioVisitorId',id)}
  return id;
}
if(location.protocol!=='file:'){
  fetch('/api/track',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitorId:getVisitorId(),path:location.pathname,referrer:document.referrer})}).catch(()=>{});
}
const feedbackForm=document.querySelector('#feedbackForm');
feedbackForm?.addEventListener('submit',async event=>{
  event.preventDefault();
  const status=document.querySelector('#feedbackStatus');
  const button=feedbackForm.querySelector('button[type="submit"]');
  const data=Object.fromEntries(new FormData(feedbackForm));
  status.className='form-note';status.textContent='Submitting feedback…';button.disabled=true;
  try{
    const response=await fetch('/api/feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,rating:Number(data.rating),visitorId:getVisitorId()})});
    const result=await response.json();
    if(!response.ok)throw new Error(result.error||'Submission failed');
    feedbackForm.reset();status.className='form-note success';status.textContent='Feedback submitted. Thank you.';
  }catch(error){status.className='form-note error';status.textContent=location.protocol==='file:'?'Feedback works after the site is deployed to Netlify.':error.message}
  finally{button.disabled=false}
});
