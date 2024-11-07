const connection = require('../config/db').promise();

async function storeConsulta(req, res) {
    const { local, horario, data, contato, idPsi } = req.body;

    if (!local || !horario || !data || !contato) {
        return res.status(400).json({
            success: false,
            message: "Todos os campos (local, horário, data e contato) são obrigatórios"
        });
    }

    const query = "INSERT INTO consultas (local, horario, data, contato, psicologo_id) VALUES (?, ?, ?, ?, ?)";
    const params = [local, horario, data, contato, idPsi];

    try {
        const [results] = await connection.query(query, params);
        return res.status(201).json({
            success: true,
            message: "Consulta cadastrada com sucesso",
            data: results
        });
    } catch (err) {
        console.error("Erro ao inserir no banco de dados:", err);
        return res.status(500).json({
            success: false,
            message: "Erro ao inserir os dados no banco de dados",
            error: err
        });
    }
}

const getConsultas = async (req, res) => {
    try {
        const [results] = await connection.query('SELECT * FROM consultas');
        res.json(results);
    } catch (error) {
        console.error("Erro ao buscar consultas:", error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar consultas',
            error
        });
    }
};

module.exports = {
    storeConsulta,
    getConsultas
};
