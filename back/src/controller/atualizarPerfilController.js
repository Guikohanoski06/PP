const connection = require('../config/db');

async function atualizarPerfil(req, res) {
    const { id, name, email, password } = req.body;
    const query = 'UPDATE users SET name = ?, email = ?, password = ?, updated_at = NOW() WHERE id = ?';

    connection.query(query, [name, email, password, id], (error, result) => {
        if (error) {
            console.error('Erro ao atualizar perfil:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro ao atualizar o perfil',
                data: error
            });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: 'Perfil atualizado com sucesso',
                data: {
                    id,
                    name,
                    email,
                    password
                }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Usuário não encontrado ou sem alterações',
                data: null
            });
        }
    });
}

module.exports = {
    atualizarPerfil
};
