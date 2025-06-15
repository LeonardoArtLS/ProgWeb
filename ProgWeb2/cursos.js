let cursos = [];
let currentCursoId = null;

document.addEventListener("DOMContentLoaded", function () {
  function renderCursos() {
    const tbody = document.querySelector("#cursosTable tbody");
    tbody.innerHTML = "";

    fetch("http://localhost:3000/cursos")
      .then((response) => response.json())
      .then((data) => {
        cursos = data;
        console.log(cursos);

        cursos.forEach((curso) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${curso.codigo}</td>
                <td>${curso.sigla}</td>
                <td>${curso.id_coordenador}</td>
                <td>${curso.descricao}</td>
                <td>${curso.nome}</td>
                <td>
                <button onclick="editCurso(${curso.codigo})">Editar</button>
                <button onclick="deleteCurso(${curso.codigo})">Excluir</button>
                </td>
                `;
          tbody.appendChild(row);
        });
      });
  }

  renderCursos();

  function addCurso(codigo, sigla, descricao, id_coordenador, nome,) {
    let curso = { codigo, sigla, descricao, id_coordenador, nome};
    console.log(curso);

    fetch("http://localhost:3000/cursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(curso),
    })
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
        renderCursos();
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

  function editCurso(codigo) {
    const prof = cursos.find(p => p.codigo == codigo);
    document.getElementById("codigo").value = prof.codigo;
    document.getElementById("sigla").value = prof.sigla;
    document.getElementById("descricao").value = prof.descricao;
    document.getElementById("id_coordenador").value = prof.id_coordenador;
    document.getElementById("nome").value = prof.nome;
    currentCursoId = codigo;
    openModal("cursoModal");
  }

  window.editCurso = editCurso;

  function deleteCurso(codigo) {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      fetch("http://localhost:3000/cursos/" + codigo, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((dados) => {
          console.log(dados);
          renderCursos();
        });
    }
  }

  window.deleteCurso = deleteCurso;

  const cursoForm = document.getElementById("cursoForm");

  cursoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const sigla = document.getElementById("sigla").value;
    const descricao = document.getElementById("descricao").value;
    const id_coordenador = document.getElementById("id_coordenador").value;
    const nome = document.getElementById("nome").value;

    if (currentCursoId !== null) {
      updateCurso(codigo, sigla, descricao, id_coordenador, nome);
    } else {
      addCurso(codigo, sigla, descricao, id_coordenador, nome);
    }
    closeModal("cursoModal");
  });

  function updateCurso(codigo, sigla, descricao, id_coordenador, nome) {
    let curso = { sigla, descricao, id_coordenador, nome};
    fetch("http://localhost:3000/cursos/" + codigo, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(curso),
    })
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
        renderCursos();
      });
  }
});
