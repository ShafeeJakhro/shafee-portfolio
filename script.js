const sections = ['hero','about','skills','projects','education','contact'];
const nodes = {
  hero: document.getElementById('n-hero'),
  about: document.getElementById('n-about'),
  skills: document.getElementById('n-skills'),
  projects: document.getElementById('n-projects'),
  edu: document.getElementById('n-edu'),
  contact: document.getElementById('n-contact')
};
const nodeKeyMap = {hero:'hero', about:'about', skills:'skills', projects:'projects', education:'edu', contact:'contact'};

function positionNodes(){
  sections.forEach(id=>{
    const el = document.getElementById(id);
    const key = nodeKeyMap[id];
    if(el && nodes[key]){
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY + rect.height/2;
      nodes[key].style.top = top + 'px';
    }
  });
}

function updateTrace(){
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const pct = Math.min(100, (scrolled / docHeight) * 100);
  document.getElementById('traceFill').style.height = pct + '%';

  sections.forEach(id=>{
    const el = document.getElementById(id);
    const key = nodeKeyMap[id];
    if(!el || !nodes[key]) return;
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight*0.6 && rect.bottom > window.innerHeight*0.2){
      nodes[key].classList.add('lit');
    } else {
      nodes[key].classList.remove('lit');
    }
  });
}

window.addEventListener('load', ()=>{ positionNodes(); updateTrace(); });
window.addEventListener('resize', ()=>{ positionNodes(); updateTrace(); });
window.addEventListener('scroll', updateTrace);

const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
burgerBtn.addEventListener('click', ()=>{
  const isOpen = mobileMenu.classList.toggle('open');
  burgerBtn.classList.toggle('open', isOpen);
  burgerBtn.setAttribute('aria-expanded', isOpen);
});
mobileMenu.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=>{
    mobileMenu.classList.remove('open');
    burgerBtn.classList.remove('open');
    burgerBtn.setAttribute('aria-expanded', 'false');
  });
});