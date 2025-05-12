let cursos = [];
let currentCursoId = null;

document.addEventListener("DOMContentLoaded", function () {
  function renderCursos() {
    const tbody = document.querySelector("#cursosTable tbody");
    tbody.innerHTML = "";

    fetch("http://localhost:3000/cursos")
      .then((response) => response.json())
      .then((cursos) => {
        console.log(cursos);

        cursos.forEach((curso, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${curso.id}</td>
                <td>${curso.nome}</td>
                <td>${curso.sigla}</td>
                <td>${curso.descricao}</td>
                <td>${curso.coordenador}</td>
                <td>
                <button onclick="editCurso(${index})">Editar</button>
                <button onclick="deleteCurso(${index})">Excluir</button>
                </td>
                `;
          tbody.appendChild(row);
        });
      });
  }

  function addCurso(
    id,
    nome,
    sigla,
    descricao,
    coordenador
  ) {
    let curso = { id, nome, sigla, descricao, coordenador };
    console.log(curso);

    fetch("http://localhost:3000/cursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(curso),
    })
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
      });
  }

  function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
  }

  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }

  const btAddCurso = document.getElementById("addCurso");
  btAddCurso.addEventListener("click", function () {
    currentCursoId = null;
    document.getElementById("cursoForm").reset();
    openModal("cursoModal");
  });

  document.querySelectorAll(".close").forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closeModal("cursoModal");
    });
  });

  function editCurso(index) {
    const curso = cursos[index];
    document.getElementById("id").value = curso.id;
    document.getElementById("nome").value = curso.nome;
    document.getElementById("sigla").value = curso.sigla;
    document.getElementById("descricao").value = curso.descricao;
    document.getElementById("coordenador").value = curso.coordenador;
    currentCursoId = index;
    openModal("cursoModal");
  }

  function deleteCurso(index) {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      cursos.splice(index, 1);
      renderCursos();
    }
  }

  const cursoForm = document.getElementById("cursoForm");
  cursoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const sigla = document.getElementById("sigla").value;
    const descricao = document.getElementById("descricao").value;
    const coordenador = document.getElementById("coordenador").value;
    //inclusão ou alteração
    if (currentCursoId !== null) {
      cursos[currentCursoId] = {
        id,
        nome,
        sigla,
        descricao,
        coordenador,
      };
    } else {
      addCurso(id, nome, sigla, descricao, coordenador);
    }
    closeModal("cursoModal");
    renderCursos();
  });
});
