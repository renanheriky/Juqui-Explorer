
function iniciarMapa(){
  const el = document.getElementById("map");
  if(!el || !window.L) return;
  const juqui = [-23.93, -47.07];
  const map = L.map("map").setView(juqui, 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"© OpenStreetMap"
  }).addTo(map);

  const pontos = [
    {nome:"Vila Viking (parceiro)", tipo:"Parceiro oficial", coords:[-23.92,-47.06], info:"Espaço temático com hospedagem e lazer."},
    {nome:"Canoar (parceiro)", tipo:"Parceiro oficial", coords:[-23.94,-47.05], info:"Turismo de aventura em rios e corredeiras."},
    {nome:"Trilha da Mata", tipo:"Trilha", coords:[-23.935,-47.08], info:"Trilha leve, ideal para iniciantes."},
    {nome:"Cachoeira da Pedra Clara", tipo:"Cachoeira", coords:[-23.945,-47.065], info:"Cachoeira com poço para banho."}
  ];

  pontos.forEach(p=>{
    L.marker(p.coords).addTo(map).bindPopup(
      "<strong>"+p.nome+"</strong><br>"+p.tipo+"<br><small>"+p.info+"</small>"
    );
  });
}

document.addEventListener("DOMContentLoaded", iniciarMapa);
