let button = document.getElementById("handleSubmit");

button.onclick = async function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let data = { email, password };

    console.log("Dados do formulário:", data);

    try {
        const response = await fetch('http://localhost:3004/api/loginpsi', {  // Ajustei para a porta correta (3005)
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });
        const content = await response.json();

        console.log(content);

        if (content.success) {
            console.log("Login realizado com sucesso!");
            window.location.href = "homePagePsicologo.html";
        } else {
            console.log("Erro ao realizar login: " + content.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
};
