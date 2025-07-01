const ul = document.getElementById('lista');
const texto = document.getElementById('caixa');

window.onload = carregarTarefas;

function adicionarItem() {
    if (texto.value !== "") {
        const tarefa = {
            texto: texto.value,
            concluida: false
        };

        const tarefas = obterTarefas();
        tarefas.push(tarefa);
        salvarTarefas(tarefas);

        renderizarTarefa(tarefa);
        texto.value = "";
    } else {
        alert('Tarefa está vazia, digite alguma tarefa');
    }
}

function renderizarTarefa(tarefa, indice = null) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('elemento');
    if (tarefa.concluida) novoItem.classList.add('concluido');

    novoItem.innerHTML = `
        <img class="imagem feito" src="./assets/images/feito.png" alt="feito">
        ${tarefa.texto}
        <img class="imagem remover" src="./assets/images/removerX.png" alt="remover">
    `;

    const botaoFeito = novoItem.querySelector('.feito');
    const botaoRemover = novoItem.querySelector('.remover');

    botaoFeito.onclick = () => {
        const tarefas = obterTarefas();
        const index = Array.from(ul.children).indexOf(novoItem);
        tarefas[index].concluida = !tarefas[index].concluida;
        salvarTarefas(tarefas);
        novoItem.classList.toggle('concluido');
    };

    botaoRemover.onclick = () => {
        const tarefas = obterTarefas();
        const index = Array.from(ul.children).indexOf(novoItem);
        tarefas.splice(index, 1);
        salvarTarefas(tarefas);
        novoItem.remove();
    };

    ul.appendChild(novoItem);
}

function carregarTarefas() {
    const tarefas = obterTarefas();
    tarefas.forEach(tarefa => renderizarTarefa(tarefa));
}

function obterTarefas() {
    return JSON.parse(localStorage.getItem('tarefas')) || [];
}

function salvarTarefas(tarefas) {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}