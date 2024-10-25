const db = require('../config/db');

// Função para psicólogo adicionar disponibilidade
const adicionarDisponibilidade = (req, res) => {
    const { psicologoId, dia, hora } = req.body;

    if (!psicologoId || !dia || !hora) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO consultas (psicologo_id, dia, hora, status) VALUES (?, ?, ?, "disponivel")';
    db.query(query, [psicologoId, dia, hora], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar disponibilidade' });
        }
        res.json({ message: 'Disponibilidade adicionada com sucesso!' });
    });
};

// Função para cliente visualizar consultas disponíveis
const visualizarConsultas = (req, res) => {
    const query = 'SELECT * FROM consultas WHERE status = "disponivel"';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar consultas' });
        }
        res.json(results);
    });
};

// Função para cliente agendar consulta
const agendarConsulta = (req, res) => {
    const { consultaId, clienteId } = req.body;

    if (!consultaId || !clienteId) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = 'UPDATE consultas SET cliente_id = ?, status = "agendado" WHERE id = ? AND status = "disponivel"';
    db.query(query, [clienteId, consultaId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao agendar consulta' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Consulta não encontrada ou já agendada' });
        }
        res.json({ message: 'Consulta agendada com sucesso!' });
    });
};

// Função para visualizar os horários disponíveis de um psicólogo em um dia específico
const visualizarHorarios = (req, res) => {
    const { psicologoId, dia } = req.query;

    if (!psicologoId || !dia) {
        return res.status(400).json({ error: 'O ID do psicólogo e o dia são obrigatórios.' });
    }

    const query = 'SELECT * FROM consultas WHERE psicologo_id = ? AND dia = ? AND status = "disponivel"';
    db.query(query, [psicologoId, dia], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar horários disponíveis.' });
        }
        res.json(results);
    });
};

module.exports = {
    adicionarDisponibilidade,
    visualizarConsultas,
    agendarConsulta,
    visualizarHorarios
};
