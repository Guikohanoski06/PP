const db = require('../config/db').promise();

// Função para obter os atendimentos
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

// Função para deletar um atendimento
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

// Função para atualizar o status de um atendimento
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

// Função para visualizar atendimentos de um usuário
const verAtendimentos = async (req, res) => {
    const userId = req.params.userId;

    try {
        const [results] = await db.query("SELECT * FROM consultas WHERE user_id = ?", [userId]);
        res.status(200).json({
            success: true,
            message: "Atendimentos encontrados",
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao buscar atendimentos",
            data: error
        });
    }
};

// Função para confirmar o atendimento
const confirmarAtendimento = async (req, res) => {
    const consultaId = req.params.consultaId;

    try {
        const [results] = await db.query("UPDATE consultas SET status = 'Confirmado' WHERE id = ?", [consultaId]);
        res.status(200).json({
            success: true,
            message: "Atendimento confirmado com sucesso",
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro ao confirmar atendimento",
            data: error
        });
    }
};

// Função para agendar o atendimento
const agendarAtendimento = async (req, res) => {
    const atendimentoId = req.params.id;
    const { status, user_id, psicologo_id } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE consultas SET status = ?, user_id = ?, psicologo_id = ? WHERE id = ?',
            [status, user_id, psicologo_id, atendimentoId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Atendimento não encontrado.' });
        }

        res.status(200).json({ message: 'Atendimento confirmado com sucesso.' });
    } catch (error) {
        console.error("Erro ao agendar atendimento:", error);
        res.status(500).json({ message: 'Erro ao agendar atendimento', error });
    }
};

// Função para buscar os horários confirmados do psicólogo logado
const getHorariosAgendados = async (req, res) => {
    const { psicologo_id } = req.query;

    if (!psicologo_id) {
        return res.status(400).json({ success: false, message: "ID do psicólogo não fornecido." });
    }

    try {
        const [result] = await db.query(
            'SELECT * FROM consultas WHERE psicologo_id = ? AND status = "Confirmado"',
            [psicologo_id]
        );

        if (result.length === 0) {
            return res.status(200).json({ success: true, message: "Nenhuma consulta encontrada.", data: [] });
        }

        res.status(200).json({ success: true, message: "Consultas encontradas.", data: result });
    } catch (error) {
        console.error('Erro ao buscar consultas:', error);
        res.status(500).json({ success: false, message: "Erro ao buscar consultas." });
    }
};


module.exports = {
    getHorarios,
    deleteHorario,
    atualizarStatus,
    verAtendimentos,
    confirmarAtendimento,
    agendarAtendimento,
    getHorariosAgendados
};
