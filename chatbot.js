
document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('jukaBtn');
  const chat = document.getElementById('jukaChat');
  const close = document.getElementById('jukaClose');
  const body = document.getElementById('jukaBody');
  btn?.addEventListener('click', ()=>{ chat.style.display = 'flex'; chat.setAttribute('aria-hidden','false'); });
  close?.addEventListener('click', ()=>{ chat.style.display = 'none'; chat.setAttribute('aria-hidden','true'); });
  document.querySelectorAll('.chip').forEach(c=> c.addEventListener('click', ()=>{
    const topic = c.dataset.topic;
    const map = {
      historia: 'Juquitiba é um município com forte ligação à Mata Atlântica. (Adicione mais texto no arquivo sobre.html)',
      projeto: 'O Juqui Explorer é um TCC voltado ao ecoturismo digital e desenvolvimento local.',
      dicas: 'Dicas: confira o clima, leve água, respeite trilhas e recolha lixo.'
    };
    const text = map[topic] || 'Posso ajudar com informações sobre pontos e segurança.';
    const msg = document.createElement('div'); msg.className='msg msg-juka'; msg.innerHTML=text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }));
});
