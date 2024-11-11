// controllers/consultaController.js
const db = require('../config/db');

// Função para pegar as consultas agendadas de um usuário
const verConsultas = (req, res) => {
  const { user_id } = req.params; // O user_id será passado via parâmetros da URL

  const query = `
    SELECT c.id, c.local, c.horario, c.data, c.contato, c.status, p.name AS psicologo_name
    FROM consultas c
    JOIN psicologos p ON c.psicologo_id = p.id
    WHERE c.status = 'Confirmado' AND c.user_id = ?
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao recuperar as consultas' });
    }

    if (results.length > 0) {
      res.json({ consultas: results });
    } else {
      res.status(404).json({ message: 'Nenhuma consulta encontrada' });
    }
  });
};

module.exports = { verConsultas };
