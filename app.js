const body=document.body;
const toggle=document.getElementById('themeToggle');
const saved=localStorage.getItem('theme');
if(saved==='dark') body.classList.add('dark');
toggle?.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('theme',body.classList.contains('dark')?'dark':'light')});
const progress=document.getElementById('progress');
addEventListener('scroll',()=>{const d=document.documentElement;const max=d.scrollHeight-d.clientHeight;progress.style.width=(max?scrollY/max*100:0)+'%'},{passive:true});
const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
const menuToggle=document.getElementById('menuToggle');
const mainNav=document.getElementById('mainNav');
menuToggle?.addEventListener('click',()=>mainNav?.classList.toggle('open'));
mainNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mainNav.classList.remove('open')));
document.querySelectorAll('.project-gallery').forEach(gallery=>{
  const slides=[...gallery.querySelectorAll('.gallery-slide')];
  if(!slides.length) return;
  const current=gallery.querySelector('.current');
  let index=0;
  const show=(next)=>{
    slides[index].classList.remove('active');
    index=(next+slides.length)%slides.length;
    slides[index].classList.add('active');
    if(current) current.textContent=index+1;
  };
  gallery.querySelector('.gallery-prev')?.addEventListener('click',()=>show(index-1));
  gallery.querySelector('.gallery-next')?.addEventListener('click',()=>show(index+1));
  let startX=null;
  gallery.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});
  gallery.addEventListener('touchend',e=>{
    if(startX===null) return;
    const dx=e.changedTouches[0].clientX-startX;
    if(Math.abs(dx)>45) show(index+(dx<0?1:-1));
    startX=null;
  },{passive:true});
});