const axios = require("axios");
const connection = require("../config/db");

async function storeUserPsi(req, res) {
    const { name, email, password, cpf, crm } = req.body;

    const crmApiUrl = `https://www.consultacrm.com.br/api/index.php?tipo=crm&q=${crm}&chave=6744402946&destino=json`;

    try {
        // Consulta à API de CRM
        const crmResponse = await axios.get(crmApiUrl);
        const crmData = crmResponse.data;

        if (!crmData || !crmData.item || crmData.item.length === 0) {
            return res.status(400).json({
                success: false,
                message: "CRM inválido ou não encontrado.",
            });
        }

        // Validação do CRM
        const crmEncontrado = crmData.item.find((item) => item.numero === crm);

        if (!crmEncontrado) {
            return res.status(400).json({
                success: false,
                message: "O CRM informado não corresponde a um CRM válido na API.",
            });
        }

        // Inserir dados no banco
        const query = "INSERT INTO psicologos(name, email, password, cpf, crm) VALUES (?, ?, ?, ?, ?)";
        connection.query(query, [name, email, password, cpf, crm], (err, results) => {
            if (err) {
                console.error("Erro ao inserir no banco:", err);
                return res.status(500).json({
                    success: false,
                    message: "Erro ao inserir os dados no banco de dados.",
                });
            }

            res.status(200).json({
                success: true,
                message: "Usuário cadastrado com sucesso.",
            });
        });
    } catch (error) {
        console.error("Erro ao consultar CRM:", error);
        res.status(500).json({
            success: false,
            message: "Erro ao verificar CRM.",
        });
    }
}

module.exports = { storeUserPsi };
