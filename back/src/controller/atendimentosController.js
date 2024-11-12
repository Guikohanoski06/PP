const db = require('../config/db');

const agendarConsulta = async (req, res) => {
  const { local, horario, data, contato, psicologo_id, user_id } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO consultas (local, horario, data, contato, psicologo_id, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [local, horario, data, contato, psicologo_id, user_id]
    );

    res.status(201).json({ message: 'Consulta agendada com sucesso!', consultaId: result.insertId });
  } catch (error) {
    console.error("Erro ao agendar consulta:", error);
    res.status(500).json({ message: 'Erro ao agendar consulta', error });
  }
};

const atualizarStatus = async (req, res) => {
  const atendimentoId = req.params.id;
  const { status } = req.body;

  try {
    const [result] = await db.query(
      'UPDATE consultas SET status = ? WHERE id = ?',
      [status, atendimentoId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Consulta não encontrada.' });
    }

    res.status(200).json({ message: 'Status da consulta atualizado com sucesso.' });
  } catch (error) {
    console.error("Erro ao atualizar status da consulta:", error);
    res.status(500).json({ message: 'Erro ao atualizar status da consulta', error });
  }
};

const buscarConsultasConfirmadas = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.query(
      'SELECT * FROM consultas WHERE user_id = ? AND status IN ("Confirmado", "Pendente")',
      [userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar consultas confirmadas:", error);
    res.status(500).json({ message: 'Erro ao buscar consultas confirmadas', error });
  }
};

module.exports = { agendarConsulta, atualizarStatus, buscarConsultasConfirmadas };
