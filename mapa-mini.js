
document.addEventListener('DOMContentLoaded', ()=>{
  const el = document.getElementById('miniMap');
  if(!el || typeof L === 'undefined') return;
  const map = L.map(el, {scrollWheelZoom:false}).setView([-23.93,-47.07],11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map);
  const pontos = [{nome:'Vila Viking',coords:[-23.92,-47.06]},{nome:'Cachoeira do França',coords:[-23.945,-47.065]},{nome:'Cachoeira do Palomar',coords:[-23.94,-47.08]}];
  pontos.forEach(p=> L.marker(p.coords).addTo(map).bindPopup(p.nome));
});
