const connection = require('../config/db');

async function mudarPerfil (request, response) {
    const { id, name, email, password } = request.body;

    const query = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
    const values = [name, email, password, id];

    try {
        const [result] = await connection.execute(query, values);

        if (result.affectedRows === 0) {
            return response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }

        return response.status(200).json({
            success: true,
            message: "Perfil atualizado com sucesso"
        });
    } catch (error) {
        console.error("Erro ao atualizar o perfil do usuário:", error);
        return response.status(500).json({
            success: false,
            message: "Erro ao atualizar o perfil no banco de dados",
            error: error.message
        });
    }
}

module.exports = { mudarPerfil  };