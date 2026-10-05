const projects=[
  {
    "id": "blockgo",
    "name": "BlockGo",
    "desc": "A grade records management capstone with dedicated Registrar, Faculty, Chairperson and Student interfaces.",
    "url": "https://github.com/blimpMac/Capstone-Project-BlockChain-BlockGo",
    "tags": [
      "React",
      "JavaScript",
      "C# / ASP.NET Core",
      "PostgreSQL",
      "Hyperledger Fabric",
      "IPFS",
      "Docker"
    ],
    "cat": "blockchain",
    "features": "Grade encoding, section management, review and approval, and student grade viewing.",
    "note": "Role interfaces shown with demo profiles; backend services were not running.",
    "screenshots": [
      {
        "src": "assets/projects/blockgo-01-registrar-dashboard.webp",
        "caption": "Registrar Dashboard"
      },
      {
        "src": "assets/projects/blockgo-02-registrar-encoding-period.webp",
        "caption": "Registrar Encoding Period"
      },
      {
        "src": "assets/projects/blockgo-03-faculty-dashboard.webp",
        "caption": "Faculty Dashboard"
      },
      {
        "src": "assets/projects/blockgo-04-chairperson-monitoring-dashboard.webp",
        "caption": "Chairperson Monitoring Dashboard"
      },
      {
        "src": "assets/projects/blockgo-05-student-summary-dashboard.webp",
        "caption": "Student Summary Dashboard"
      }
    ],
    "demo": null,
    "glow": "#ff9f72"
  },
  {
    "id": "survey",
    "name": "Digital Survey System",
    "desc": "A survey application for creating questionnaires, collecting feedback and viewing response analytics.",
    "url": "https://github.com/blimpMac/ASPNet2.0",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "C# / ASP.NET Core",
      "SQL Server",
      "Entity Framework Core",
      "Chart.js"
    ],
    "cat": "web",
    "features": "Admin and Staff workspaces, public surveys, template management and analytics.",
    "note": "Charts and questionnaires shown with sample data.",
    "screenshots": [
      {
        "src": "assets/projects/survey-01-admin-home-dashboard.webp",
        "caption": "Admin Home Dashboard"
      },
      {
        "src": "assets/projects/survey-02-admin-analytics-dashboard.webp",
        "caption": "Admin Analytics Dashboard"
      },
      {
        "src": "assets/projects/survey-03-staff-home-dashboard.webp",
        "caption": "Staff Home Dashboard"
      },
      {
        "src": "assets/projects/survey-04-staff-survey-management.webp",
        "caption": "Staff Survey Management"
      },
      {
        "src": "assets/projects/survey-05-public-respondent.webp",
        "caption": "Public Respondent"
      }
    ],
    "demo": null,
    "glow": "#a77bff"
  },
  {
    "id": "library",
    "name": "Library Management System",
    "desc": "An academic library application for maintaining books, recording borrowing and returns, and monitoring library activity.",
    "url": "https://github.com/blimpMac/FinalProjectForASPNET",
    "tags": [
      "HTML",
      "CSS",
      "JavaScript",
      "C# / ASP.NET Core",
      "SQL Server",
      "Entity Framework Core",
      "Chart.js"
    ],
    "cat": "system",
    "features": "Admin book management, Staff borrowing and return lookups, and a library statistics dashboard.",
    "note": "Statistics shown with sample data. Transaction workflows require the backend.",
    "screenshots": [
      {
        "src": "assets/projects/library-01-admin-statistics-dashboard.webp",
        "caption": "Admin Statistics Dashboard"
      },
      {
        "src": "assets/projects/library-02-admin-book-management.webp",
        "caption": "Admin Book Management"
      },
      {
        "src": "assets/projects/library-03-admin-update-delete.webp",
        "caption": "Admin Update Delete"
      },
      {
        "src": "assets/projects/library-04-staff-borrowing-workspace.webp",
        "caption": "Staff Borrowing Workspace"
      },
      {
        "src": "assets/projects/library-05-staff-return-records.webp",
        "caption": "Staff Return Records"
      }
    ],
    "demo": null,
    "glow": "#64e3c3"
  },
  {
    "id": "messenger",
    "name": "React MessengerStyle",
    "desc": "A Messenger-inspired React interface with General, Gaming and Support channels and local chatbot replies.",
    "url": "https://github.com/blimpMac/React-MessengerStyle",
    "tags": [
      "React",
      "JavaScript",
      "CSS"
    ],
    "cat": "web",
    "features": "Channel switching, separate in-session histories, message composition and simulated typing.",
    "note": "Local frontend prototype. Replies use templates; messages do not persist after a reload.",
    "screenshots": [
      {
        "src": "assets/projects/messenger-01-general-workspace.webp",
        "caption": "General Workspace"
      },
      {
        "src": "assets/projects/messenger-02-gaming-channel.webp",
        "caption": "Gaming Channel"
      },
      {
        "src": "assets/projects/messenger-03-support-channel.webp",
        "caption": "Support Channel"
      },
      {
        "src": "assets/projects/messenger-04-conversation.webp",
        "caption": "Conversation"
      }
    ],
    "demo": null,
    "glow": "#6f8cff"
  }
];
let activeFilter='all';
let projectView='cards';
try { projectView=localStorage.getItem('portfolioProjectView')==='list'?'list':'cards'; } catch {}
const projectRoot=document.querySelector('#projects');
function renderProjects(){
 projectRoot.classList.toggle('project-list',projectView==='list');
 projectRoot.replaceChildren();
 projects.filter(p=>activeFilter==='all'||p.cat===activeFilter).forEach(p=>{
  const button=document.createElement('button');button.type='button';button.className='project-card';button.style.setProperty('--glow',p.glow);button.dataset.project=p.id;button.setAttribute('aria-label','View '+p.name+' project');
  button.innerHTML=`<img class="project-cover" src="${p.screenshots[0].src}" alt="${p.screenshots[0].caption}" loading="lazy"><div class="project-copy"><span class="num">PROJECT / ${p.cat.toUpperCase()}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="tags">${p.tags.slice(0,4).map(t=>`<span>${t}</span>`).join('')}</div><span class="project-cta">View project →</span></div>`;
  button.addEventListener('click',()=>showProject(p,button));projectRoot.append(button);
 });
 document.querySelectorAll('[data-project-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.projectView===projectView)));
 document.querySelector('#repoCount').textContent=projects.length;
}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{activeFilter=b.dataset.filter;document.querySelectorAll('.filters button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});renderProjects();});
document.querySelectorAll('[data-project-view]').forEach(b=>b.onclick=()=>{projectView=b.dataset.projectView;try{localStorage.setItem('portfolioProjectView',projectView);}catch{}renderProjects();});
let projectTrigger=null;
function showProject(p,trigger){
 projectTrigger=trigger;
 document.querySelector('#projectTitle').textContent=p.name;
 document.querySelector('#projectDescription').textContent=p.desc;
 document.querySelector('#projectFeatures').textContent=p.features;
 document.querySelector('#projectNote').textContent=p.note;
 document.querySelector('#projectStack').replaceChildren(...p.tags.map(t=>{const el=document.createElement('span');el.textContent=t;return el;}));
 document.querySelector('#projectRepository').href=p.url;
 const gallery=document.querySelector('#projectGallery');gallery.replaceChildren(...p.screenshots.map(shot=>{const figure=document.createElement('figure');const img=document.createElement('img');img.src=shot.src;img.alt=shot.caption;img.loading='lazy';const caption=document.createElement('figcaption');caption.textContent=shot.caption;figure.append(img,caption);return figure;}));
 const demo=document.querySelector('#projectDemo');demo.hidden=!p.demo;if(p.demo){demo.src=p.demo;}else{demo.removeAttribute('src');}
 openModal(document.querySelector('#projectModal'));
}
renderProjects();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
window.addEventListener('mousemove',e=>{const g=document.querySelector('.cursor-glow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
const tilt=document.querySelector('.tilt');tilt?.addEventListener('mousemove',e=>{const r=tilt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;tilt.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`});tilt?.addEventListener('mouseleave',()=>tilt.style.transform='');

const documents={
 resume:{title:'OJT Resume Preview',pdf:'documents/pdf/Drician-Cordon-Resume.pdf',docx:'documents/Drician-Cordon-Resume.docx'},
 cv:{title:'Professional CV Preview',pdf:'documents/pdf/Drician-Cordon-Professional-CV.pdf',docx:'documents/Drician-Cordon-Professional-CV.docx'}
};
const previewModal=document.querySelector('#previewModal');
const contactModal=document.querySelector('#contactModal');
let previousFocus=null;
function openModal(modal){previousFocus=document.activeElement;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');modal.querySelector('.modal-close')?.focus()}
function closeModal(modal){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');if(modal===previewModal)document.querySelector('#previewFrame').src='about:blank';previousFocus?.focus()}
document.querySelectorAll('.open-preview').forEach(button=>button.addEventListener('click',()=>{const doc=documents[button.dataset.document];document.querySelector('#previewTitle').textContent=doc.title;document.querySelector('#previewFrame').src=doc.pdf+'#toolbar=1&navpanes=0&view=FitH';document.querySelector('#previewDownloadPdf').href=doc.pdf;document.querySelector('#previewDownloadDocx').href=doc.docx;openModal(previewModal)}));
document.querySelectorAll('.open-contact').forEach(button=>button.addEventListener('click',()=>openModal(contactModal)));
document.querySelectorAll('[data-close-modal]').forEach(button=>button.addEventListener('click',()=>closeModal(button.closest('.modal'))));
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.modal.open').forEach(closeModal)});

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

document.addEventListener('keydown',event=>{if(event.key!=='Tab')return;const modal=document.querySelector('.modal.open');if(!modal)return;const nodes=[...modal.querySelectorAll('button,a[href],input,select,textarea,iframe,video[controls]')].filter(el=>el.getClientRects().length&&!el.disabled);if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}});
