const connection = require('../config/db');

async function storeUser(request, response) {
    const params = [
        request.body.name, 
        request.body.email,
        request.body.password
    ];

    const query = "INSERT INTO users(name, email, password) VALUES(?,?,?)";

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error("Erro ao inserir no banco de dados:", err);
            return response.status(400).json({
                success: false,
                message: "Erro ao inserir os dados no banco de dados",
                error: err
            });
        }

        return response.status(200).json({
            success: true,
            message: "Usuário cadastrado com sucesso",
            data: results
        });
    });
}

const db = require('../config/db'); // Conectando ao banco de dados

exports.getPsychologists = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM psicologos');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar psicólogos', error });
  }
};

module.exports = {
    storeUser,
    getPsychologists
};
