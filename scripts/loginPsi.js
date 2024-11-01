document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("handleSubmit");
    let errorMessage = document.getElementById("errorMessage"); // Definindo errorMessage

    button.addEventListener("click", async function () {
        let name = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Validação básica
        if (!name || !email || !password) {
            errorMessage.textContent = "Por favor, preencha todos os campos.";
            errorMessage.style.display = "block"; // Exibe a mensagem de erro
            return;
        }

        let data = { name, email, password };
        console.log("Dados do formulário:", data);
        localStorage.setItem("psicologo", JSON.stringify(data));
        try {
            const response = await fetch('http://localhost:3004/api/loginPsi', {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            console.log(content);

            if (content.success) {
                console.log("Login realizado com sucesso!");

                

                window.location.href = "../front/homePagePsicologo.html";
            } else {
                console.log("Erro ao realizar login!");
                errorMessage.textContent = "Usuário ou senha inválidos."; // Mensagem de erro
                errorMessage.style.display = "block"; // Exibe a mensagem de erro
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            errorMessage.textContent = "Erro ao conectar ao servidor."; // Mensagem de erro
            errorMessage.style.display = "block"; // Exibe a mensagem de erro
        }
    });
});
