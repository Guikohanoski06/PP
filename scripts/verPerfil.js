document.addEventListener("DOMContentLoaded", function() {
    // Recupera os dados do usuário armazenados no localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        // Preenche os campos com os dados do usuário
        document.getElementById("name").value = user.name || "";
        document.getElementById("email").value = user.email || "";
        document.getElementById("password").value = user.password || "";
    } else {
        // Caso não haja dados no localStorage, redireciona para a página de login
        alert("Nenhum dado de usuário encontrado.");
        window.location.href = "login.html";
    }
});

// Função para habilitar a edição de todos os campos
function enableEditAll() {
    const inputs = document.querySelectorAll(".profile-info input");
    inputs.forEach(input => {
        input.disabled = false; // Habilita todos os campos
        input.focus(); // Foca no primeiro campo editável
    });

    document.getElementById("saveButton").style.display = "block"; // Exibe o botão de salvar
}

// Função para salvar os dados no localStorage e backend
function saveData() {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    user.name = document.getElementById("name").value;
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;

    // Atualiza os dados no localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Enviar dados ao backend
    const data = {
        id: user.id, // Supondo que o ID do usuário está armazenado
        name: user.name,
        email: user.email,
        password: user.password
    };

    fetch('http://localhost:3004/api/atualizarPerfil', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar os dados.');
        }
        return response.json();
    })
    .then(data => {
        alert('Dados salvos com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar os dados.');
    });
}

// Adiciona os eventos de clique aos botões
document.getElementById("editAllButton").addEventListener("click", function() {
    enableEditAll();
});

document.getElementById("saveButton").addEventListener("click", function() {
    saveData();
});
