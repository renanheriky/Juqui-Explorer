
const produtos = [
  {id:"camiseta-eco", nome:"Camisetas ecológicas", preco:50.00, desc:"Camisetas produzidas com materiais sustentáveis e estampas de Juquitiba."},
  {id:"ecobag", nome:"Ecobags personalizadas", preco:40.00, desc:"Ecobags com arte inspirada em trilhas, rios e cachoeiras da região."},
  {id:"caneca", nome:"Canecas temáticas", preco:30.00, desc:"Canecas com ilustrações da natureza e dos pontos turísticos."},
  {id:"chaveiro", nome:"Chaveiros artesanais", preco:15.00, desc:"Chaveiros feitos à mão com elementos da cultura local."}
];

let carrinho = [];

function renderProdutos(){
  const lista = document.getElementById("produtosLista");
  if(!lista) return;
  lista.innerHTML = "";
  produtos.forEach(p=>{
    const div = document.createElement("div");
    div.className = "produto-card";
    div.innerHTML = `
      <div class="produto-nome">${p.nome}</div>
      <div>${p.desc}</div>
      <div class="produto-preco">R$ ${p.preco.toFixed(2).replace(".", ",")}</div>
      <button class="btn btn-primary btn-sm" data-id="${p.id}">Adicionar ao carrinho</button>
    `;
    lista.appendChild(div);
  });
  lista.addEventListener("click", e=>{
    const btn = e.target.closest("button[data-id]");
    if(!btn) return;
    adicionarAoCarrinho(btn.getAttribute("data-id"));
  });
}

function adicionarAoCarrinho(id){
  const item = carrinho.find(i=>i.id===id);
  if(item){
    item.qtd += 1;
  }else{
    carrinho.push({id,qtd:1});
  }
  renderCarrinho();
}

function removerDoCarrinho(id){
  carrinho = carrinho.filter(i=>i.id!==id);
  renderCarrinho();
}

function renderCarrinho(){
  const box = document.getElementById("carrinhoItens");
  const totalEl = document.getElementById("carrinhoTotal");
  if(!box || !totalEl) return;
  box.innerHTML = "";
  if(!carrinho.length){
    box.innerHTML = '<p class="carrinho-empty">Nenhum item no carrinho ainda.</p>';
    totalEl.textContent = "Total: R$ 0,00";
    return;
  }
  let total = 0;
  carrinho.forEach(item=>{
    const prod = produtos.find(p=>p.id===item.id);
    if(!prod) return;
    const linha = document.createElement("div");
    linha.className = "carrinho-item";
    const subtotal = prod.preco * item.qtd;
    total += subtotal;
    linha.innerHTML = `
      <span>${item.qtd}x ${prod.nome}</span>
      <span>R$ ${subtotal.toFixed(2).replace(".", ",")}</span>
      <button class="btn btn-outline btn-sm" onclick="removerDoCarrinho('${item.id}')">x</button>
    `;
    box.appendChild(linha);
  });
  totalEl.textContent = "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function montarMensagemWhatsApp(){
  if(!carrinho.length) return "Olá! Gostaria de saber mais sobre os produtos da Loja Juqui Explorer.";
  let msg = "Olá! Gostaria de finalizar um pedido na Loja Juqui Explorer:%0A%0A";
  carrinho.forEach(item=>{
    const prod = produtos.find(p=>p.id===item.id);
    if(!prod) return;
    msg += `- ${item.qtd}x ${prod.nome} (R$ ${prod.preco.toFixed(2).replace(".", ",")})%0A`;
  });
  msg += "%0ATotal aproximado: " + encodeURIComponent(document.getElementById("carrinhoTotal").textContent);
  msg += "%0A%0APodemos seguir com o fechamento do pedido?";
  return msg;
}

function configurarWhatsApp(){
  const btn = document.getElementById("btnFinalizar");
  if(!btn) return;
  btn.addEventListener("click", ()=>{
    const msg = montarMensagemWhatsApp();
    const tel = "5511999999999"; // alterar para o número oficial quando disponível
    const url = `https://wa.me/${tel}?text=${msg}`;
    window.open(url, "_blank");
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  renderProdutos();
  renderCarrinho();
  configurarWhatsApp();
});
