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

function toggleEdit(field) {
    const inputField = document.getElementById(field);
    const button = document.getElementById(`edit-${field}-button`);

    if (button.innerText === "Editar") {
        inputField.disabled = false;
        inputField.focus();
        button.innerText = "Salvar";
    } else {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        user[field] = inputField.value;
        localStorage.setItem("user", JSON.stringify(user));

        saveData(user);

        inputField.disabled = true;
        button.innerText = "Editar";
    }
}

function saveData(user) {
    const data = {
        id: user.id,          
        name: user.name,
        email: user.email,
        password: user.password
    };

    fetch('http://localhost:3004/api/atualizarPerfil', { // fazer um post para cada input
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
        console.log('Dados atualizados com sucesso:', data);
        alert('Dados atualizados com sucesso!');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao salvar os dados.');
    });
}
