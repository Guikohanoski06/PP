const db = require('../config/db').promise();

// Obter horários de atendimentos para um psicólogo específico
const getHorarios = async (req, res) => {
    const psicologoId = req.query.psicologo_id;

    try {
        const [results] = await db.query(
            'SELECT * FROM consultas WHERE psicologo_id = ?',
            [psicologoId]
        );
        res.json(results);
    } catch (error) {
        console.error("Erro ao buscar atendimentos:", error);
        res.status(500).json({ message: 'Erro ao buscar atendimentos', error });
    }
};

// Deletar um horário de atendimento pelo ID
const deleteHorario = async (req, res) => {
    const id = req.params.id;

    try {
        const [result] = await db.query('DELETE FROM consultas WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Atendimento não encontrado.' });
        }
        res.status(200).json({ message: 'Atendimento deletado com sucesso' });
    } catch (error) {
        console.error("Erro ao deletar atendimento:", error);
        res.status(500).json({ message: 'Erro ao deletar atendimento', error });
    }
};

// Atualizar o status de um atendimento para "confirmado" ou "indisponível"
const atualizarStatus = async (req, res) => {
    const atendimentoId = req.params.id;
    const { status } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE consultas SET status = ? WHERE id = ?',
            [status, atendimentoId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Atendimento não encontrado.' });
        }

        res.status(200).json({ message: 'Status do atendimento atualizado com sucesso.' });
    } catch (error) {
        console.error("Erro ao atualizar status do atendimento:", error);
        res.status(500).json({ message: 'Erro ao atualizar status do atendimento', error });
    }
};

module.exports = {
    getHorarios,
    deleteHorario,
    atualizarStatus,
};
