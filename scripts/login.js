document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("handleSubmit");

    button.addEventListener("click", async function () {
        let name = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (!name || !email || !password) {
            errorMessage.textContent = "Por favor, preencha todos os campos.";
            errorMessage.style.display = "block";
            return;
        }

        
        let data = { name, email, password };
        console.log("Dados do formulário:", data);

        try {
            const response = await fetch('http://localhost:3004/api/login', {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data)
            });
            const content = await response.json();
            console.log(content);
         
            if (content.success) {
                console.log("Login realizado com sucesso!");

                // Salva apenas o user_id no localStorage
                localStorage.setItem("user_id", content.data.id);

                // Redireciona para a página de perfil
                window.location.href = "../front/homePage.html";
            } else {
                console.log("Erro ao realizar login!");
                errorMessage.textContent = "Usuário ou senha inválidos.";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            errorMessage.textContent = "Erro ao conectar ao servidor.";
            errorMessage.style.display = "block";
        }
    });
});
