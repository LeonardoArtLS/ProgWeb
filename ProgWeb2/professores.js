let professores = [];
let currentProfessorId = null;

document.addEventListener("DOMContentLoaded", function () {
  function renderProfessores() {
    const tbody = document.querySelector("#professoresTable tbody");
    tbody.innerHTML = "";

    fetch("http://localhost:3000/professores")
      .then((response) => response.json())
      .then((professores) => {
        console.log(professores);

        professores.forEach((professor, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                <td>${professor.codigo}</td>
                <td>${professor.nomeProfessor}</td>
                <td>${professor.emailProfessor}</td>
                <td>
                <button onclick="editProfessor(${index})">Editar</button>
                <button onclick="deleteProfessor(${index})">Excluir</button>
                </td>
                `;
          tbody.appendChild(row);
        });
      });
  }

  function addProfessor(codigo, nomeProfessor, emailProfessor) {
    let professor = { codigo, nomeProfessor, emailProfessor };
    console.log(professor);

    fetch("http://localhost:3000/professores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(professor),
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

  function editProfessor(index) {
    const prof = professores[index];
    document.getElementById("codigo").value = prof.codigo;
    document.getElementById("nome").value = prof.nome;
    document.getElementById("email").value = prof.email;
    currentProfessorId = index;
    openModal("professorModal");
  }

  function deleteProfessor(index) {
    if (confirm("Tem certeza que deseja excluir este professor?")) {
      professores.splice(index, 1);
      renderProfessores();
    }
  }

  const professorForm = document.getElementById("professorForm");
  professorForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    if (currentProfessorId !== null) {
      professores[currentProfessorId] = { codigo, nome, email };
    } else {
      addProfessor(codigo, nome, email);
    }
    closeModal("professorModal");
    renderProfessores();
  });
});
