const connection = require('../config/db');

async function atualizarPerfil(req, res) {
    const { name, email, password } = req.body; // Remova 'id' daqui
    const query = 'UPDATE users SET email = ?, password = ?, updated_at = NOW() WHERE name = ?'; // Atualiza pela coluna 'name'

    connection.query(query, [email, password, name], (error, result) => {
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
                    name,
                    email
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
async function atualizarPerfilPsicologo(req, res) {
    const { name, email, password } = req.body; // Remova 'id' daqui
    const query = 'UPDATE psicologos SET email = ?, password = ?, updated_at = NOW() WHERE name = ?'; // Atualiza pela coluna 'name'

    connection.query(query, [email, password, name], (error, result) => {
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
                    name,
                    email
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
    atualizarPerfil,
    atualizarPerfilPsicologo
};
