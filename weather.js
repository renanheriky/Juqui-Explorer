
const weatherTempEl = document.getElementById('weatherTemp');
const weatherAdviceEl = document.getElementById('weatherAdvice');
const weatherUpdateNote = document.getElementById('weatherUpdateNote');
async function atualizarClima(){
  try{
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-23.93&longitude=-47.07&current_weather=true&timezone=America%2FSao_Paulo');
    if(!res.ok) throw new Error('Erro clima');
    const data = await res.json();
    const c = data.current_weather;
    const temp = Math.round(c.temperature);
    const wind = Math.round(c.windspeed);
    weatherTempEl.textContent = temp + '°C';
    let advice = 'Hoje as condições são neutras.';
    if(temp >= 28) advice = 'Temperatura alta — cuidado ao pedalar, leve água e proteção solar.';
    else if(temp >= 18) advice = 'Ótimo para pedalar e fazer trilhas.';
    else if(temp >= 10) advice = 'Fresco — leve um agasalho leve para trilhas.';
    else advice = 'Frio — evite atividades aquáticas sem roupa adequada.';
    weatherAdviceEl.textContent = advice;
    weatherUpdateNote.textContent = 'Última atualização automática';
  }catch(e){
    console.error(e);
    if(weatherTempEl) weatherTempEl.textContent='--°C';
    if(weatherAdviceEl) weatherAdviceEl.textContent='Não foi possível carregar o clima';
  }
}
atualizarClima();
setInterval(atualizarClima, 10*60*1000);
