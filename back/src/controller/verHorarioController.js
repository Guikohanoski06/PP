const db = require('../config/db');

const getHorario = async (req, res) => {
  const psicologoId = req.query.psicologo_id; // Pegando o psicologo_id da URL
  
  try {
    // Consulta os atendimentos do psicólogo específico
    const [results] = await db.query('SELECT * FROM consultas WHERE psicologo_id = ?', [psicologoId]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar atendimentos', error });
  }
};

const deleteHorario = async (req, res) => {
  const id = req.params.id;
  
  try {
    await db.query('DELETE FROM consultas WHERE id = ?', [id]);
    res.status(200).json({ message: 'Atendimento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar atendimento', error });
  }
};

module.exports = { getHorario, deleteHorario };
