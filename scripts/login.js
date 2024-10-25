let button = document.getElementById("handleSubmit");

button.onclick = async function () {

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
        window.location.href = "../front/homePage.html";
    } else {
        console.log("Erro ao realizar login!");
    }
};
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
