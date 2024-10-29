document.addEventListener("DOMContentLoaded", function() {
    let button = document.getElementById("handleSubmit");

    button.addEventListener("click", async function () {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let data = { email, password };

        console.log("Dados do formulário:", data);

        const response = await fetch('http://localhost:3004/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });
        const content = await response.json();
        console.log(content);

        if (content.success) {
            console.log("Login realizado com sucesso!");

            // Salva os dados do usuário no localStorage
            localStorage.setItem("user", JSON.stringify(content.data[0]));

            // Redireciona para a página de perfil
            window.location.href = "../front/verPerfil.html";
        } else {
            console.log("Erro ao realizar login!");
        }
    });
});
