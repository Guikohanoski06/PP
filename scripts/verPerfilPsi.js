document.addEventListener("DOMContentLoaded", function() {
    const psicologo = JSON.parse(localStorage.getItem("psicologo"));
    console.log(psicologo);

    if (psicologo) {
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const passwordField = document.getElementById("password");

        if (nameField) nameField.value = psicologo.name || "";
        if (emailField) emailField.value = psicologo.email || "";
        if (passwordField) passwordField.value = psicologo.password || "";

        // Chamar a função para carregar consultas
        carregarConsultasDoPsicologo(psicologo.id);
    } else {
        alert("Nenhum dado de usuário encontrado.");
        window.location.href = "loginPsi.html";
    }
});

// Função para carregar as consultas do psicólogo logado
function carregarConsultasDoPsicologo(id) {
    fetch(`http://localhost:3004/consultas/psicologo/${id}`)
        .then(response => response.json())
        .then(consultas => {
            const listaConsultas = document.getElementById("lista-consultas");
            listaConsultas.innerHTML = ""; // Limpa a lista antes de preencher

            consultas.forEach(consulta => {
                const item = document.createElement("li");
                item.textContent = `Data: ${consulta.dia} | Hora: ${consulta.hora} | Status: ${consulta.status}`;
                listaConsultas.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar consultas do psicólogo:", error);
            alert("Erro ao carregar as consultas. Tente novamente mais tarde.");
        });
}

function enableEditAll() {
    const inputs = document.querySelectorAll(".profile-info input");
    inputs.forEach(input => {
        if (input.id !== "name") { // Não habilitar o campo de nome
            input.disabled = false;
        }
    });
    document.getElementById("saveButton").style.display = "block";
    document.getElementById("editAllButton").style.display = "none";
}

function saveData() {
    const psicologo = JSON.parse(localStorage.getItem("psicologo")) || {};
    
    const updatedData = {
        id: psicologo.id,
        name: psicologo.name,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    
    console.log(updatedData);

    localStorage.setItem("psicologo", JSON.stringify(updatedData));

    fetch('http://localhost:3004/api/atualizarPerfilPsicologo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
        console.log(data);
        alert('Dados salvos com sucesso!');
        
        document.getElementById("saveButton").style.display = "none";
        document.getElementById("editAllButton").style.display = "block";
        
        location.reload(); // Opcional: Recarregar a página para refletir as mudanças
    })
    .catch(error => {
        console.error('Erro ao atualizar perfil:', error);
        alert('Ocorreu um erro ao salvar os dados. Verifique a conexão com o servidor.');
    });
}

// Eventos
document.getElementById("editAllButton").addEventListener("click", enableEditAll);
document.getElementById("saveButton").addEventListener("click", saveData);
