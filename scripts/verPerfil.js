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

function toggleEdit(field) {
    const inputField = document.getElementById(field);
    const button = document.getElementById(`edit-${field}-button`);

    if (button.innerText === "Editar") {
        inputField.disabled = false;
        button.innerText = "Salvar";
    } else {
        // Salva as mudanças no localStorage
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user[field] = inputField.value;
        localStorage.setItem("user", JSON.stringify(user));
        
        inputField.disabled = true;
        button.innerText = "Editar";
    }
}
