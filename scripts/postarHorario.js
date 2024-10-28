let button = document.getElementById("handleSubmit");

button.onclick = async function (event) {
    event.preventDefault(); 

    let local = document.getElementById("local").value;
    let horario = document.getElementById("horario").value;
    let contato = document.getElementById("contato").value;

    let data = { local, horario, contato };
    console.log("Dados do formulário:", data);

    try {
        const response = await fetch('http://localhost:3004/api/horario/create', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        const content = await response.json();
        console.log("Resposta do servidor:", content);

        if (content.success) {
            alert("Horário cadastrado com sucesso!");
            window.location.href = "homePagePsicologo.html";
        } else {
            alert("Erro ao enviar os dados: " + content.message);
        }
    } catch (error) {
        console.error("Erro ao processar a resposta do servidor:", error);
        alert("Erro ao processar a resposta");
    }
};
