document.getElementById("cadastroForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtendo valores do formulário
    let name = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpf = document.getElementById("cpf").value;
    let crm = document.getElementById("crm").value;

    let data = { name, email, password, cpf, crm };

    // URL da API CRM
    const crmApiUrl = `https://www.consultacrm.com.br/api/index.php?tipo=crm&q=${crm}&chave=6744402946&destino=json`;

    try {
        // Verificar CRM na API
        const crmResponse = await fetch(crmApiUrl);
        if (!crmResponse.ok) {
            throw new Error("Erro ao consultar a API CRM.");
        }

        const crmData = await crmResponse.json();
        console.log("Resposta da API CRM:", crmData);

        // Validação do CRM
        if (!crmData || !crmData.item || crmData.item.length === 0) {
            alert("CRM não encontrado ou inválido.");
            return;
        }

        // Localiza o CRM correspondente
        const crmEncontrado = crmData.item.find((item) => item.numero === crm);

        if (!crmEncontrado) {
            alert("O CRM informado não corresponde a um CRM válido na API.");
            return;
        }

        // Enviar dados para o servidor
        const response = await fetch('http://localhost:3004/api/user/createpsi', {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data),
        });

        const content = await response.json();
        console.log("Resposta do servidor:", content);

        if (content.success) {
            alert("Cadastro realizado com sucesso.");
            window.location.href = "loginPsi.html";
        } else {
            alert("Erro ao cadastrar: " + content.message);
        }
    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert("Erro ao processar a solicitação.");
    }
});
