const ul = document.getElementById("lista");
const texto = document.getElementById("caixa");

window.onload = carregarTarefas;

function adicionarItem() {
  if (texto.value !== "") {
    const tarefa = {
      texto: texto.value,
      concluida: false,
    };

    const tarefas = obterTarefas();
    tarefas.push(tarefa);
    salvarTarefas(tarefas);

    renderizarTarefa(tarefa);
    texto.value = "";
  } else {
    alert("Tarefa está vazia, digite alguma tarefa");
  }
}

function renderizarTarefa(tarefa) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("elemento");
  if (tarefa.concluida) novoItem.classList.add("concluido");

  novoItem.innerHTML = `
        <img class="imagem feito" src="./assets/images/feito.png" alt="feito">
        <span class="texto-tarefa">${tarefa.texto}</span>
        <img class="imagem remover" src="./assets/images/removerX.png" alt="remover">
    `;

  const botaoFeito = novoItem.querySelector(".feito");
  const botaoRemover = novoItem.querySelector(".remover");
  const textoSpan = novoItem.querySelector(".texto-tarefa");

  botaoFeito.onclick = () => {
    const tarefas = obterTarefas();
    const index = Array.from(ul.children).indexOf(novoItem);
    tarefas[index].concluida = !tarefas[index].concluida;
    salvarTarefas(tarefas);
    novoItem.classList.toggle("concluido");
  };

  botaoRemover.onclick = () => {
    const tarefas = obterTarefas();
    const index = Array.from(ul.children).indexOf(novoItem);
    tarefas.splice(index, 1);
    salvarTarefas(tarefas);
    novoItem.remove();
  };

  textoSpan.onclick = () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = textoSpan.textContent;
    input.className = "editar-tarefa";

    textoSpan.replaceWith(input);
    input.focus();

    input.addEventListener("blur", salvar);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
    });

    function salvar() {
      const novoTexto = input.value.trim();
      if (novoTexto !== "") {
        textoSpan.textContent = novoTexto;

        const tarefas = obterTarefas();
        const index = Array.from(ul.children).indexOf(novoItem);
        tarefas[index].texto = novoTexto;
        salvarTarefas(tarefas);

        input.replaceWith(textoSpan);
      } else {
        input.focus();
      }
    }
  };

  ul.appendChild(novoItem);
}

function carregarTarefas() {
  const tarefas = obterTarefas();
  tarefas.forEach((tarefa) => renderizarTarefa(tarefa));
}

function obterTarefas() {
  return JSON.parse(localStorage.getItem("tarefas")) || [];
}

function salvarTarefas(tarefas) {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function editarTarefa() {}
