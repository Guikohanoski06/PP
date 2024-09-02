let button = document.getElementById("handleSubmit");

button.onclick = async function () {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let data = { email, password };

    console.log("Dados do formulário:", data);

    const response = await fetch('http://localhost:3001/api/login', {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });
    const content = await response.json();
    console.log(content);

    if (content.success) {
        console.log("Login realizado com sucesso!");
        window.location.href = "../front/homePage.html";
    } else {
        console.log("Erro ao realizar login!");
    }
};
