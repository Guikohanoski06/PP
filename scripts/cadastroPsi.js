let button = document.getElementById("handleSubmit");

button.onclick = async function (event) {
    event.preventDefault(); 

    let name = document.getElementById("username").value;  
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpf = document.getElementById("cpf").value;

    let data = { name, email, password, cpf };  
    console.log("Dados do formulário:", data);

    try {
        const response = await fetch('http://localhost:3004/api/user/createpsi', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        const content = await response.json();
        console.log("Resposta do servidor:", content);
        if (content.success) {
            alert("Sucesso");
            window.location.href = "loginPsi.html";
        } else {
            alert("Erro ao enviar os dados: " + content.message);
        }
    } catch (error) {
        console.error("Erro ao processar a resposta do servidor:", error);
        alert("Erro ao processar a resposta");
    }
};