const db = require('../config/db').promise();

// Obter horários de atendimentos para um usuário específico
const getHorariosPorUsuario = async (req, res) => {
    const userId = req.params.user_id;

    try {
        const [results] = await db.query(
            'SELECT * FROM consultas WHERE user_id = ?',
            [userId]
        );
        res.json(results);
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
        res.status(500).json({ message: 'Erro ao buscar atendimentos', error });
    }
};

// Atualizar o status de um atendimento e associar com user_id
const agendarAtendimento = async (req, res) => {
    const atendimentoId = req.params.atendimento_id;
    const { status, user_id, psicologo_id } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE consultas SET status = ?, user_id = ?, psicologo_id = ? WHERE id = ?',
            [status, user_id, psicologo_id, atendimentoId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Atendimento não encontrado.' });
        }

        res.status(200).json({ message: 'Status do atendimento atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao agendar atendimento:", error);
        res.status(500).json({ message: 'Erro ao agendar atendimento', error });
    }
};

module.exports = {
    getHorariosPorUsuario,
    agendarAtendimento,
};
