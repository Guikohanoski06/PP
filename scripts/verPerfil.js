document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
        document.getElementById("name").value = user.name || "";
        document.getElementById("email").value = user.email || "";
        document.getElementById("password").value = user.password || ""; 
    } else {
        alert("Nenhum dado de usuário encontrado.");
        window.location.href = "login.html";
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
    const user = JSON.parse(localStorage.getItem("user")) || {};
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;

    const updatedData = {
        name: user.name,
        email: user.email,
        password: user.password
    };
    console.log(updatedData)

    localStorage.setItem("user", JSON.stringify(updatedData));

    fetch('http://localhost:3004/api/atualizarPerfil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
        console.log(data)
        alert('Dados salvos com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar os dados.');
    });
}

document.getElementById("editAllButton").addEventListener("click", enableEditAll);
document.getElementById("saveButton").addEventListener("click", saveData);
