const ul = document.getElementById("lista");
const texto = document.getElementById("caixa");
    
function adicionarItem() {
    if (texto.value != ""){
        let novoItem = document.createElement("li");

        novoItem.innerHTML = `<img class="imagem" onclick="tarefaConcluida()" src="./assets/images/feito.png" alt="feito.png">${texto.value}<img class="imagem" src="./assets/images/removerX.png" alt="removerX.png">`;
        ul.appendChild(novoItem);
    } else {
        alert("Tarefa está vazia, digite alguma tarefa")
    }
}

function tarefaConcluida() {
}