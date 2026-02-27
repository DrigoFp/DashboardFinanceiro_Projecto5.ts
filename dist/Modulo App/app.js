/*
OBJETIVO:
Conectar tudo.

PASSO A PASSO:

1) Capturar inputs do formulário.
2) Escutar clique do botão.
3) Validar dados.
4) Criar objeto transação.
5) Atualizar estado.
6) Re-renderizar UI.
7) Limpar formulário.

IMPORTANTE:
Sempre que adicionar uma transação:
- Atualizar lista
- Atualizar cards

Pergunta:
O que deve acontecer quando a página recarrega?
*/
// IMPORTS
import { adicionarTransacao, obterTransacoes, removerTransacao, carregarDados, } from "../Modulo State/state.js";
import { renderizarTransacoes, renderizarCards, } from "../Modulo UserInterface/userIterface.js";
import { criarTransacao } from "../Modulo Transactions/transactions.js";
carregarDados();
document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target)
        return;
    if (target.classList.contains("btn-remover")) {
        const id = target.dataset.id;
        // CONFIRMAÇÃO
        const confirmar = confirm("Tens a certeza que queres remover esta transação?");
        if (!confirmar)
            return;
        if (id === undefined)
            return;
        removerTransacao(id);
        renderizarTransacoes(obterTransacoes());
        renderizarCards(obterTransacoes());
        removerTransacao("Transação removida!");
    }
});
// CAPTURAR ELEMENTOS DO DOM (Passo 1)
const inputDescricao = document.querySelector("#descricao");
const inputQuantidade = document.querySelector("#quantidade");
const inputTipo = document.querySelector("#tipo-transacao");
const botaoAdicionar = document.querySelector(".adiciona-historia");
const calendario = document.querySelector(".calendario");
// BOTOES DE ACRESCENTAR ELEMENTOS ÀS DESPESAS/RECEITAS
let categoriaSelecionada = null;
const botoesCategoria = document.querySelectorAll(".categorias");
const selectTipo = document.querySelector("#tipo-transacao");
// Função que ativa/desativa categorias conforme o tipo escolhido
function atualizarCategorias() {
    if (!selectTipo)
        return; // garante que existe
    const tipoAtual = selectTipo.value; // "receita" ou "despesa"
    botoesCategoria.forEach((botao) => {
        const tipoBotao = botao.classList.contains("receita")
            ? "receita"
            : "despesa";
        if (tipoBotao !== tipoAtual) {
            botao.classList.add("desativada");
            botao.classList.remove("ativa");
        }
        else {
            botao.classList.remove("desativada");
        }
    });
    categoriaSelecionada = null; // limpar seleção inválida
}
// Atualizar categorias quando o tipo muda
if (selectTipo) {
    selectTipo.addEventListener("change", atualizarCategorias);
}
// Selecionar categoria válida
botoesCategoria.forEach((botao) => {
    botao.addEventListener("click", () => {
        if (botao.classList.contains("desativada"))
            return;
        botoesCategoria.forEach((b) => b.classList.remove("ativa"));
        if (!botao.textContent)
            return;
        botao.classList.add("ativa");
        categoriaSelecionada = botao.textContent.trim();
    });
});
// Executar ao iniciar
atualizarCategorias();
// quando clico num botão de categoria
botoesCategoria.forEach((botao) => {
    botao.addEventListener("click", () => {
        const tipoBotao = botao.classList.contains("receita")
            ? "receita"
            : "despesa";
        // verificar compatibilidade
        if (!selectTipo)
            return;
        if (tipoBotao !== selectTipo.value) {
            alert(`Esta categoria só pode ser usada para ${tipoBotao}.`);
            return;
        }
        // remover seleção anterior
        botoesCategoria.forEach((b) => b.classList.remove("ativa"));
        // ativar o botão clicado
        botao.classList.add("ativa");
        // guardar categoria
        if (!botao.textContent)
            return;
        categoriaSelecionada = botao.textContent.trim();
    });
});
// CALENDÁRIO DINÂMICO
const hoje = new Date();
const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
];
const dia = hoje.getDate();
const mes = meses[hoje.getMonth()];
const ano = hoje.getFullYear();
if (calendario) {
    calendario.textContent = `${dia} ${mes} ${ano}`;
}
// CARREGAR TRANSACOES EXISTENTES
const transacoesIniciais = obterTransacoes();
renderizarTransacoes(transacoesIniciais);
renderizarCards(transacoesIniciais);
// EVENTO DO BOTÃO (Passos 2 a 7)
if (botaoAdicionar) {
    botaoAdicionar.addEventListener("click", function () {
        // PASSO 2: Ler inputs
        if (!inputDescricao)
            return;
        if (!inputQuantidade)
            return;
        if (!inputTipo)
            return;
        const descricao = inputDescricao.value.trim();
        const quantidade = Number(inputQuantidade.value);
        const tipo = inputTipo.value;
        // PASSO 3: Validar dados
        if (descricao === "") {
            alert("A descrição não pode estar vazia.");
            return;
        }
        if (isNaN(quantidade) || quantidade <= 0) {
            alert("O valor deve ser um número maior que zero.");
            return;
        }
        // PASSO 4: Criar objeto transação
        if (tipo === "receita" || tipo === "despesa") {
            const novaTransacao = criarTransacao(descricao, quantidade, categoriaSelecionada || "Outros", tipo);
            // ---------------------------
            // PASSO 5: Atualizar estado
            // ---------------------------
            const listaAtualizada = adicionarTransacao(novaTransacao);
            // ---------------------------
            // PASSO 6: Re-renderizar UI
            // ---------------------------
            renderizarTransacoes(listaAtualizada);
            renderizarCards(listaAtualizada);
            // ---------------------------
            // PASSO 7: Limpar formulário
            // ---------------------------
            inputDescricao.value = "";
            inputQuantidade.value = "";
            inputTipo.value = "receita";
        }
    });
}
const btnTema = document.querySelector("#toggle-theme");
if (btnTema) {
    btnTema.addEventListener("click", () => {
        document.body.classList.toggle("light");
        // trocar ícone
        btnTema.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
    });
}
;
//# sourceMappingURL=app.js.map