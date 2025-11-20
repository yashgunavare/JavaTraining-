
// Basic JS for portfolio interactivity
document.addEventListener('DOMContentLoaded', () => {
  const projects = [
    {id:1, title:'Crop Recommendation (CNN)', desc:'Image-based crop suggestion pipeline with preprocessing and evaluation.', tags:['ml'] , repo:'#', live:'#'},
    {id:2, title:'Customer Feedback Mgmt (Salesforce)', desc:'Salesforce Classic workflows, dashboards and automation.', tags:['salesforce'] , repo:'#', live:'#'},
    {id:3, title:'ERP Management (Java + JDBC)', desc:'Inventory & user modules with JDBC & MySQL integration.', tags:['web'] , repo:'#', live:'#'},
    {id:4, title:'Portfolio (This Site)', desc:'Static site with native JS, responsive layout, dark mode and accessibility.', tags:['web'] , repo:'#', live:'#'}
  ];

  const grid = document.getElementById('projects-grid');
  const search = document.getElementById('project-search');
  const filter = document.getElementById('project-filter');

  function render(list){
    grid.innerHTML = '';
    if(list.length===0){ grid.innerHTML = '<p class="muted">No projects found.</p>'; return; }
    list.forEach(p=>{
      const el = document.createElement('article');
      el.className = 'project-card';
      el.innerHTML = `
        <div>
          <h4>${p.title}</h4>
          <div class="muted small">${p.tags.join(', ')}</div>
          <p style="margin-top:8px">${p.desc}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <a href="${p.repo}" class="btn" target="_blank" rel="noreferrer">Repo</a>
          <a href="${p.live}" class="btn primary" target="_blank" rel="noreferrer">Live</a>
        </div>
      `;
      grid.appendChild(el);
    });
  }

  function applyFilter(){
    const q = (search.value || '').toLowerCase();
    const f = filter.value;
    let out = projects.filter(p => (p.title+p.desc).toLowerCase().includes(q));
    if(f!=='all') out = out.filter(p => p.tags.includes(f));
    render(out);
  }

  search.addEventListener('input', applyFilter);
  filter.addEventListener('change', applyFilter);
  render(projects);

  // Skill bars animate on scroll into view
  const skillBars = document.querySelectorAll('.skill-bar');
  function animateSkills(){
    skillBars.forEach(bar=>{
      const level = bar.getAttribute('data-level') || 60;
      bar.querySelector('span').style.width = level + '%';
    });
  }
  animateSkills();

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  function setTheme(t){
    if(t==='dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', t);
    themeBtn.textContent = t==='dark' ? '☀️' : '🌙';
  }
  themeBtn.addEventListener('click', () => {
    const t = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    setTheme(t);
  });
  setTheme(localStorage.getItem('theme') || 'light');

  // Mobile nav toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  mobileToggle.addEventListener('click', ()=>{
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.style.display = expanded ? '' : 'flex';
  });

  // Smooth scroll and active link highlight
  const navLinksA = document.querySelectorAll('.nav-link');
  function onScroll(){
    const fromTop = window.scrollY + 80;
    navLinksA.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if(!section) return;
      if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
        navLinksA.forEach(l=>l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Contact form validation (client-side)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let valid = true;
    ['name','email','subject','message'].forEach(id=>{
      const el = document.getElementById(id);
      const err = el.parentElement.querySelector('.error');
      err.textContent = '';
      if(!el.value || el.value.trim().length===0){ err.textContent = 'This field is required.'; valid=false; }
      if(id==='email' && el.value){
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
        if(!ok){ err.textContent = 'Enter a valid email.'; valid=false; }
      }
    });
    if(!valid){ status.textContent = 'Please fix the errors above.'; status.style.color='#b91c1c'; return; }
    // For demo, we just show a success message.
    status.textContent = 'Message sent (demo). Thank you!';
    status.style.color='#16a34a';
    form.reset();
  });

  // set year
  document.getElementById('curYear').textContent = new Date().getFullYear();
});
