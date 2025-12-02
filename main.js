
// Clima em tempo real para Juquitiba (Open-Meteo)
async function carregarClima(){
  try{
    const t = document.getElementById("weatherTemp");
    const extra = document.getElementById("weatherExtra");
    const title = document.querySelector(".weather-title");
    if(!t || !extra || !title) return;
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-23.93&longitude=-47.07&current_weather=true&timezone=America%2FSao_Paulo";
    const res = await fetch(url);
    const data = await res.json();
    const c = data.current_weather;
    t.textContent = Math.round(c.temperature) + "°C";
    title.textContent = "Agora em Juquitiba";
    extra.textContent = "Vento " + Math.round(c.windspeed) + " km/h • Atualizado agora";
  }catch(e){
    console.error(e);
  }
}

// Carrossel simples da Home
function iniciarCarousel(){
  const track = document.getElementById("homeCarousel");
  if(!track) return;
  const slides = Array.from(track.querySelectorAll(".carousel-slide"));
  if(!slides.length) return;
  let idx = 0;
  setInterval(()=>{
    slides[idx].classList.remove("active");
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add("active");
  }, 5000);
}

// Chatbot da Juka
function iniciarJuka(){
  const btn = document.getElementById("jukaBtn");
  const chat = document.getElementById("jukaChat");
  const close = document.getElementById("jukaClose");
  const body = document.getElementById("jukaBody");
  const chips = document.querySelectorAll(".chip");
  if(!btn || !chat || !close || !body) return;

  btn.addEventListener("click", ()=>{
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
  });
  close.addEventListener("click", ()=>{
    chat.style.display = "none";
  });

  const respostas = {
    historia: "Juquitiba se destaca pela presença de Mata Atlântica, rios e cachoeiras, integrando natureza preservada à Região Metropolitana de São Paulo.",
    passeio: "Sugestão de passeio: manhã na Vila Viking ou Canoar, trilha leve à tarde e final do dia em uma cachoeira de acesso simples.",
    seguranca: "Dicas: verifique o clima, use roupas e calçados adequados, leve água, informe alguém sobre o roteiro e respeite orientações de guias e propriedades.",
    projeto: "O Juqui Explorer é uma iniciativa digital focada em organizar e divulgar informações de ecoturismo em Juquitiba, aproximando visitantes e negócios locais."
  };

  chips.forEach(chip=>{
    chip.addEventListener("click", ()=>{
      const topic = chip.dataset.topic;
      if(!respostas[topic]) return;

      const userMsg = document.createElement("div");
      userMsg.className = "msg msg-user";
      userMsg.textContent = chip.textContent.trim();
      body.appendChild(userMsg);

      const jMsg = document.createElement("div");
      jMsg.className = "msg msg-juka";
      jMsg.textContent = respostas[topic];
      body.appendChild(jMsg);

      body.scrollTop = body.scrollHeight;
    });
  });
}

// Áudio de fundo (som da natureza)
function iniciarAudio(){
  const audio = document.getElementById("ambientAudio");
  const btn = document.getElementById("audioToggle");
  if(!audio || !btn) return;
  let tocando = false;
  btn.addEventListener("click", ()=>{
    if(!tocando){
      audio.play().catch(()=>{});
      btn.textContent = "⏸ Som da natureza";
      tocando = true;
    }else{
      audio.pause();
      btn.textContent = "▶ Som da natureza";
      tocando = false;
    }
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  carregarClima();
  iniciarCarousel();
  iniciarJuka();
  iniciarAudio();
});
