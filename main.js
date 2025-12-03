
document.getElementById('menuToggle')?.addEventListener('click', ()=>{ document.getElementById('mainNav')?.classList.toggle('open'); });
document.addEventListener('DOMContentLoaded', ()=>{
  const slides = Array.from(document.querySelectorAll('#homeCarousel .slide'));
  let idx=0;
  function show(i){ slides.forEach((s,si)=> s.style.display = si===i ? 'block' : 'none'); }
  if(slides.length){ show(0); setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); },4000); }
});
