let professores = [];
let currentProfessorId = null;

document.addEventListener("DOMContentLoaded", function () {
  function renderProfessores() {
    const tbody = document.querySelector("#professoresTable tbody");
    tbody.innerHTML = "";

    fetch("http://localhost:3000/professores")
      .then((response) => response.json())
      .then((data) => {
        professores = data;
        console.log(professores);

        professores.forEach((professor) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${professor.codigo}</td>
                <td>${professor.nome}</td>
                <td>${professor.email}</td>
                <td>
                <button onclick="editProfessor(${professor.codigo})">Editar</button>
                <button onclick="deleteProfessor(${professor.codigo})">Excluir</button>
                </td>
                `;
          tbody.appendChild(row);
        });
      });
  }

  renderProfessores();

  function addProfessor(codigo, nomeProfessor, emailProfessor) {
    let professor = { codigo, nome: nomeProfessor, email: emailProfessor };
    console.log(professor);

    fetch("http://localhost:3000/professores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(professor),
    })
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
        renderProfessores();
      });
  }

  function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
  }

  function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
  }

  const btAddProfessor = document.getElementById("addProfessor");
  btAddProfessor.addEventListener("click", function () {
    currentProfessorId = null;
    document.getElementById("professorForm").reset();
    openModal("professorModal");
  });

  document.querySelectorAll(".close").forEach(function (closeBtn) {
    closeBtn.addEventListener("click", function () {
      closeModal("professorModal");
    });
  });

  function editProfessor(codigo) {
    const prof = professores.find(p => p.codigo == codigo);
    document.getElementById("codigo").value = prof.codigo;
    document.getElementById("nome").value = prof.nome;
    document.getElementById("email").value = prof.email;
    currentProfessorId = codigo;
    openModal("professorModal");
  }

  window.editProfessor = editProfessor;

  function deleteProfessor(codigo) {
    if (confirm("Tem certeza que deseja excluir este professor?")) {
      fetch("http://localhost:3000/professores/" + codigo, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((dados) => {
          console.log(dados);
          renderProfessores();
        });
    }
  }

  window.deleteProfessor = deleteProfessor;

  const professorForm = document.getElementById("professorForm");

  professorForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (currentProfessorId !== null) {
      updateProfessor(codigo, nome, email);
    } else {
      addProfessor(codigo, nome, email);
    }
    closeModal("professorModal");
  });

  function updateProfessor(codigo, nome, email) {
    let professor = { codigo, nome, email };
    fetch("http://localhost:3000/professores/" + codigo, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(professor),
    })
      .then((response) => response.json())
      .then((dados) => {
        console.log(dados);
        renderProfessores();
      });
  }
});
