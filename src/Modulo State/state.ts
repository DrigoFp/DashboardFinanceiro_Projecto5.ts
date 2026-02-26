/*
OBJETIVO:
Centralizar o controle das transações em memória.

PENSAMENTO:

1) Carregar as transações salvas quando o sistema iniciar.
2) Criar função para:
   - Retornar lista atual.
   - Adicionar nova transação.
   - (Opcional) remover transação.
3) Sempre que alterar o estado:
   - Atualizar o localStorage.

REFLEXÃO:
- Por que não manipular o localStorage diretamente no UI?
Resposta- 
- O que significa separar responsabilidade?
Resposta- cada modulo só faz uma coisa.

DESAFIO:
Como garantir que o array nunca fique fora de sincronia?
*/
//-----------------------------------------------------------
// carregarDados() altera transacoes

// transacao  = [valor, data, categoria, descriçao, receita, despesa]

import { lerDados, salvarDados } from "../Modulo Storage/storage.js";

let transacoes = [];

// 1) Carregar dados do localStorage ao iniciar
export function carregarDados() {
  transacoes = lerDados(); // devolve [] se não houver nada
}

// 2) Devolver a lista atual
export function obterTransacoes() {
  return transacoes;
}

// 3) Adicionar nova transação
export function adicionarTransacao(novaTransacao) {
  transacoes.push(novaTransacao);
  salvarDados(transacoes);
  return transacoes;
}

// 4) Remover transação por id
export function removerTransacao(id) {
  transacoes = transacoes.filter(t => t.id !== id);
  salvarDados(transacoes);
  return transacoes;
}
