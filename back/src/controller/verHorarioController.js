const db = require('../config/db').promise(); // Conectando ao banco de dados com promessas

// Função para obter todos os atendimentos
const getHorario = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM consultas');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar atendimentos', error });
  }
};

// Função para deletar um atendimento
const deleteHorario = async (req, res) => {
  const { id } = req.params; // Obtendo o ID do atendimento a ser deletado

  try {
    const [result] = await db.query('DELETE FROM consultas WHERE id = ?', [id]); // Ajuste o nome da coluna se necessário
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Atendimento não encontrado' });
    }
    res.status(204).send(); // 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar atendimento', error });
  }
};

module.exports = {
  getHorario,
  deleteHorario,
};
