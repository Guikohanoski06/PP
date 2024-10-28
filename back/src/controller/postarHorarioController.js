const connection = require('../config/db').promise();

async function storeConsulta(request, response) {
    const params = [
        request.body.local,
        request.body.horario,
        request.body.contato
    ];

    const query = "INSERT INTO consultas(local, horario, contato) VALUES(?,?,?)";

    try {
        const [results] = await connection.query(query, params);
        return response.status(200).json({
            success: true,
            message: "Consulta cadastrada com sucesso",
            data: results
        });
    } catch (err) {
        console.error("Erro ao inserir no banco de dados:", err);
        return response.status(400).json({
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
    res.status(500).json({ message: 'Erro ao buscar psicólogos', error });
  }
};

module.exports = {
    storeConsulta,
    getConsultas
};
