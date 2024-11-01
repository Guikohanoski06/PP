document.addEventListener("DOMContentLoaded", function() {
    const psicologo = JSON.parse(localStorage.getItem("psicologo"));
    console.log(psicologo)


    if (psicologo) {
        document.getElementById("name").value = psicologo.name || "";
        document.getElementById("email").value = psicologo.email || "";
        document.getElementById("password").value = psicologo.password || "";
    } else {
        alert("Nenhum dado de usuário encontrado.");
        window.location.href = "loginPsi.html";
    }
});

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
    const psicologo = localStorage.getItem("psicologo") || {};
    console.log(psicologo);
    psicologo.email = document.getElementById("email").value;
    psicologo.password = document.getElementById("password").value;

    const updatedData = {
        id: psicologo.id,           
        name: psicologo.name,
        email: psicologo.email,
        password: psicologo.password
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
        location.reload(); // Opcional: Recarregar a página para refletir as mudanças
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar os dados.');
    });
}

// Eventos
document.getElementById("editAllButton").addEventListener("click", enableEditAll);
document.getElementById("saveButton").addEventListener("click", saveData);
