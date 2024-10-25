const connection = require('../config/db');

async function storeUser(request, response) {
    const params = [
        request.body.name, 
        request.body.email,
        request.body.password,
        request.body.cpf
    ];

    const query = "INSERT INTO psicologos(name, email, password, cpf) VALUES(?,?,?,?)";

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

module.exports = {
    storeUser
};
