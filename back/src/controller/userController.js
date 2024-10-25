const connection = require('../config/db').promise();

async function storeUser(request, response) {
    const params = [
        request.body.name, 
        request.body.email,
        request.body.password
    ];

    const query = "INSERT INTO users(name, email, password) VALUES(?,?,?)";

    try {
        const [results] = await connection.query(query, params);
        return response.status(200).json({
            success: true,
            message: "Usuário cadastrado com sucesso",
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

const db = require('../config/db').promise(); // Conectando ao banco de dados com promessas

const getPsychologists = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM psicologos');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar psicólogos', error });
  }
};

module.exports = {
    storeUser,
    getPsychologists,
};
