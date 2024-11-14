const connection = require('../config/db');

async function atualizarPerfil(req, res) {
    console.log('Dados recebidos:', req.body);
    const { name, email, password } = req.body;
    const query = 'UPDATE users SET email = ?, password = ?, updated_at = NOW() WHERE name = ?';

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
                data: { name, email }
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
    console.log('Dados recebidos para psicólogo:', req.body);
    const { name, email, password } = req.body;
    const query = 'UPDATE psicologos SET email = ?, password = ?, updated_at = NOW() WHERE name = ?';

    connection.query(query, [email, password, name], (error, result) => {
        if (error) {
            console.error('Erro ao atualizar perfil de psicólogo:', error);
            return res.status(500).json({
                success: false,
                message: 'Erro ao atualizar o perfil',
                data: error
            });
        }

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: 'Perfil de psicólogo atualizado com sucesso',
                data: { name, email }
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'Psicólogo não encontrado ou sem alterações',
                data: null
            });
        }
    });
}

module.exports = {
    atualizarPerfil,
    atualizarPerfilPsicologo
};
