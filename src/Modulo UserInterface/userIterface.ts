/*
OBJETIVO:
Atualizar a interface sempre que o estado mudar.

PENSAMENTO:

1) Selecionar o container da lista.
2) Limpar o conteúdo antes de renderizar novamente.
3) Para cada transação:
   - Criar elemento HTML dinamicamente.
   - Inserir no DOM.
4) Atualizar os cards com os valores calculados.

REFLEXÃO:
- Por que limpar antes de renderizar?
- O que acontece se não limpar?

DESAFIO:
Como aplicar classes diferentes para receita e despesa?
*/

import { removerTransacao } from "../Modulo State/state.js";

export function criarEstrutura() {
  const listaTransacoes = document.querySelector(".lista-transacoes");
  listaTransacoes.innerHTML = ""; // limpar o container
}

// RENDERIZAR LISTA DE TRANSAÇÕES

export function renderizarTransacoes(transacoes) {
  const listaTransacoes = document.querySelector(".lista-transacoes");
  listaTransacoes.innerHTML = ""; // limpar antes de renderizar

  transacoes.forEach(function (transacao) {
    const caixaTransacao = document.createElement("div");
    caixaTransacao.classList.add("transacao");

    // aplicar classe dependendo do tipo
    if (transacao.valor < 0) {
      caixaTransacao.classList.add("despesa");
    } else {
      caixaTransacao.classList.add("receita");
    }

    caixaTransacao.innerHTML = `
            <p>${transacao.descricao}</p>
            <p>${transacao.categoria}</p>
            <p>${transacao.data}</p>
            <p class="${transacao.valor < 0 ? "valor-despesa" : "valor-receita"}">
                ${transacao.valor.toFixed(2)} €
            </p>
            <button class="btn-remover" data-id="${transacao.id}">🗑️</button>
        `;

    listaTransacoes.appendChild(caixaTransacao);
  });
}

// RENDERIZAR CARDS (saldo, receitas, despesas)

export function renderizarCards(transacoes) {
  const totalReceitas = transacoes
    .filter((t) => t.valor > 0)
    .reduce((acc, t) => acc + t.valor, 0);

  const totalDespesas = transacoes
    .filter((t) => t.valor < 0)
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = totalReceitas + totalDespesas;

  // CARD 1 — SALDO TOTAL
  document.querySelector(".cards .card:nth-child(1) .valor").textContent =
    saldo.toFixed(2) + " €";

  // CARD 2 — RECEITAS
  document.querySelector(".cards .card:nth-child(2) .valor").textContent =
    totalReceitas.toFixed(2) + " €";

  // CARD 3 — DESPESAS
  document.querySelector(".cards .card:nth-child(3) .valor").textContent =
    totalDespesas.toFixed(2) + " €";
}

// CRIAR TRANSACAO COM DATA

export function criarTransacao(descricao, valor, categoria, tipo) {
  return {
    id: Date.now(),
    descricao,
    valor,
    categoria,
    tipo,
    data: new Date().toLocaleDateString("pt-PT"),
  };
}
