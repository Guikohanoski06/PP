const db = require('../config/db');

const getHorario = async (req, res) => {
  const psicologoId = req.query.psicologo_id;
  console.log(`Buscando atendimentos para o psicólogo com ID: ${psicologoId}`); // Log para depuração

  try {
    const [results] = await db.query('SELECT * FROM consultas WHERE psicologo_id = ?', [psicologoId]);
    res.json(results);
  } catch (error) {
    console.error("Erro ao buscar atendimentos:", error);
    res.status(500).json({ message: 'Erro ao buscar atendimentos', error });
  }
};

const deleteHorario = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "O ID do atendimento é necessário.", id });
  }

  try {
    await db.query('DELETE FROM consultas WHERE id = ?', [id]);
    res.status(200).json({ message: 'Atendimento deletado com sucesso' });
  } catch (error) {
    console.error("Erro ao deletar atendimento:", error);
    res.status(500).json({ message: 'Erro ao deletar atendimento', error });
  }
};

module.exports = { getHorario, deleteHorario };
