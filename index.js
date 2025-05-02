function novaTarefa() {
  overlay.classList.add("active");
  criarTarefa.classList.add("active");
}
function fecharNovaTarefa() {
  overlay.classList.remove("active");
  criarTarefa.classList.remove("active");
}
function buscarTarefas() {
  fetch("http://localhost:3000/tarefas")
    .then((res) => res.json())
    .then((res) => {
      inserirTarefa(res);
      // console.log("Tarefas carregadas com sucesso.");
    });
}
buscarTarefas();
function inserirTarefa(listaDeTarefas) {
  if (listaDeTarefas.length > 0) {
    lista.innerHTML = "";

    listaDeTarefas.map((tarefa) => {
      lista.innerHTML += `
  <li>
    <h5>${tarefa.titulo}</h5>
    <p>${tarefa.descricao}</p>
    <div class="status">
      <div class="edit">
        <box-icon name="edit-alt" size="sm" onclick="editarTarefa(${tarefa.id})"></box-icon>
      </div>
      <div class="delete">
        <box-icon name="trash" size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
      </div>
    </div>
  </li>
`;
    });
  }
}


function inserirTarefaNova() {
  event.preventDefault();

  const id = titulo.getAttribute("data-id"); // verifica se estamos editando

  const tarefa = {
    titulo: titulo.value,
    descricao: descricao.value,
  };

  const url = id ? `http://localhost:3000/tarefas/${id}` : "http://localhost:3000/tarefas";
  const metodo = id ? "PUT" : "POST";

  fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("Tarefa salva:", res);

    //  let form = document.querySelector("form");
    //   form.reset(); // limpa os campos do formulário
      titulo.value = "";
      descricao.value = "";
      titulo.removeAttribute("data-id"); // remove o estado de edição

      buscarTarefas();
      fecharNovaTarefa();
    })
    
}
function editarTarefa(id) {
 
  fetch(`http://localhost:3000/tarefas/${id}`)
    .then((res) => res.json())
    .then((tarefa) => {
      titulo.value = tarefa.titulo;
      descricao.value = tarefa.descricao;
      titulo.setAttribute("data-id", id);

      novaTarefa();
    })
    
}

function deletarTarefa(id) {
  const confirmar = confirm("Tem certeza que deseja deletar esta tarefa?");
  
  if (confirmar) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((res) => {
      buscarTarefas();
      
      
    })
    
  }
}
function pesquisarTarefa() {
  let lis = document.querySelectorAll("ul li");
  if (busca.value.length > 0) {
    lis.forEach(li => {
      // Transforma ambos os textos para minúsculas para permitir que a
      // busca não seja sensível a maiúsculas/minúsculas
      if (!li.children[1].innerText.toLowerCase().includes(busca.value.toLowerCase())) {
        li.classList.add("oculto");
      } else {
        li.classList.remove("oculto");
      }
    });
  } else {
    lis.forEach(li => {
      li.classList.remove("oculto");
    });
  }
}
