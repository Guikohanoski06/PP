const connection = require('../config/db');

async function getPsicologos(request, response) {
    const query = "SELECT * FROM psicologos";

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Erro ao buscar dados no banco de dados:", err);
            return response.status(400).json({
                success: false,
                message: "Erro ao buscar os dados no banco de dados",
                error: err
            });
        }

        return response.status(200).json({
            success: true,
            message: "Dados dos psicólogos obtidos com sucesso",
            data: results
        });
    });
}

module.exports = {
    getPsicologos
};
