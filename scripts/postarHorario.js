document.getElementById("handleSubmit").onclick = async function (event) {
    event.preventDefault(); 

    // Captura os valores dos inputs
    const local = document.getElementById("local").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;
    const contato = document.getElementById("contato").value;

    // Cria o objeto com os dados a serem enviados
    const consultaData = { local, data, horario, contato };
    console.log("Dados do formulário:", consultaData);

    try {
        // Realiza a requisição POST para cadastrar o atendimento
        const response = await fetch('http://localhost:3004/api/horario/create', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(consultaData)
        });

        const content = await response.json();
        console.log("Resposta do servidor:", content);

        // Verifica se a operação foi bem-sucedida e redireciona ou mostra alerta
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
