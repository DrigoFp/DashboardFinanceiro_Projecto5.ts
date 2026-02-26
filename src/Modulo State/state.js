"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.carregarDados = carregarDados;
exports.obterTransacoes = obterTransacoes;
exports.adicionarTransacao = adicionarTransacao;
exports.removerTransacao = removerTransacao;
// transacao  = [valor, data, categoria, descriçao, receita, despesa]
const storage_js_1 = require("../Modulo Storage/storage.js");
let transacoes = [];
// 1) Carregar dados do localStorage ao iniciar
function carregarDados() {
    transacoes = (0, storage_js_1.lerDados)(); // devolve [] se não houver nada
}
// 2) Devolver a lista atual
function obterTransacoes() {
    return transacoes;
}
// 3) Adicionar nova transação
function adicionarTransacao(novaTransacao) {
    transacoes.push(novaTransacao);
    (0, storage_js_1.salvarDados)(transacoes);
    return transacoes;
}
// 4) Remover transação por id
function removerTransacao(id) {
    transacoes = transacoes.filter(t => t.id !== id);
    (0, storage_js_1.salvarDados)(transacoes);
    return transacoes;
}
//# sourceMappingURL=state.js.map