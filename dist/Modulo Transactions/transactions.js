/*
OBJETIVO:
Calcular saldo total, total de receitas e total de despesas.

PENSAMENTO:

1) O saldo começa em 0.
2) Para cada transação:
   - Se for receita, soma.
   - Se for despesa, subtrai.
3) Para calcular totais separados:
   - Filtrar por tipo.
   - Somar valores.

DICA IMPORTANTE:
Use reduce().

Pergunta:
- O que é o acumulador?
Resposta: É o valor que vai sendo actualizado a cada iteração do reduce
- Qual deve ser o valor inicial?
Resposta: Deve começar em 0

Exemplo mental:
[100, -50, 200]
Resultado esperado: 250

Não escreva loops tradicionais.
*/
function calcularTotalTransacoes(transacoes) {
    return transacoes.reduce(function (acumulador, transacao) {
        return acumulador + transacao.valor;
    }, 0);
}
function receitatransacoes(transacoes) {
    let totalReceitas = transacoes.reduce(function (acumulador, transacao) {
        if (transacao.tipo === "receita") {
            acumulador += transacao.valor;
        }
        return acumulador;
    }, 0);
    return totalReceitas;
}
function despesatransacoes(transacoes) {
    let totalDespesas = transacoes.reduce(function (acumulador, transacao) {
        if (transacao.tipo === "despesa") {
            acumulador += transacao.valor; // soma o valor negativo
        }
        return acumulador;
    }, 0);
    return totalDespesas;
}
function calcularSaldo(transacoes) {
    let receitas = receitatransacoes(transacoes);
    let despesas = despesatransacoes(transacoes);
    let saldo = receitas + despesas;
    return saldo;
}
export function criarTransacao(descricao, valor, categoria, tipo) {
    return {
        id: crypto.randomUUID(),
        descricao,
        valor: tipo === "despesa" ? -valor : valor,
        categoria,
        tipo,
        data: new Date().toLocaleDateString("pt-PT")
    };
}
//# sourceMappingURL=transactions.js.map