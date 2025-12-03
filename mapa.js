
document.addEventListener('DOMContentLoaded', ()=>{
  const el = document.getElementById('map');
  if(!el || typeof L === 'undefined') return;
  const map = L.map(el).setView([-23.93,-47.07],11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'}).addTo(map);
  const locais = [
    {id:'franca',nome:'Represa Cachoeira do França',addr:'Estr. da Marina 260, Juquitiba, SP',coords:[-23.945,-47.065]},
    {id:'palomar',nome:'Cachoeira do Palomar',addr:'Lot. Palomar, Juquitiba - SP',coords:[-23.94,-47.08]},
    {id:'vila',nome:'Vila Viking',addr:'Sítio Gervásio, Juquitiba - SP',coords:[-23.92,-47.06]},
    {id:'pesqueiro',nome:'Pesqueiro Estancia Campos',addr:'Estr. do Enxadão, Juquitiba - SP',coords:[-23.96,-47.04]}
  ];
  locais.forEach(l=>{
    const popup = `<strong>${l.nome}</strong><br/>${l.addr}<br/><a href="https://waze.com/ul?q=${encodeURIComponent(l.addr)}" target="_blank">Abrir no Waze</a> · <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.addr)}" target="_blank">Google Maps</a>`;
    L.marker(l.coords).addTo(map).bindPopup(popup);
  });
});
