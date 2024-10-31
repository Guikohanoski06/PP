document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    
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
    inputs.forEach(input => input.disabled = false);
    document.getElementById("saveButton").style.display = "block";
    document.getElementById("editAllButton").style.display = "none";
}

function saveData() {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    user.name = document.getElementById("name").value;
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;

    // Enviar o ID do usuário também
    const updatedData = {
        id: user.id, // Adicione o ID do usuário
        name: user.name,
        email: user.email,
        password: user.password
    };

    localStorage.setItem("user", JSON.stringify(updatedData));

    fetch('http://localhost:3004/api/atualizarPerfil', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData) // Envia os dados atualizados
    })
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(data => {
        alert('Dados salvos com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar os dados.');
    });
}

// Adicione os listeners para os botões
document.getElementById("editAllButton").addEventListener("click", enableEditAll);
document.getElementById("saveButton").addEventListener("click", saveData);
