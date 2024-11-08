// routes/atendimentos.js
const express = require('express');
const router = express.Router();
const { getHorarios, deleteHorario, atualizarStatus } = require('../controller/verHorarioController');

/**
 * @swagger
 * tags:
 *   name: Atendimentos
 *   description: API para gerenciamento de atendimentos
 */

/**
 * @swagger
 * /atendimentos:
 *   get:
 *     summary: Obtém a lista de atendimentos
 *     tags: [Atendimentos]
 *     responses:
 *       200:
 *         description: Lista de atendimentos obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   local:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: date
 *                   horario:
 *                     type: string
 *                     format: time
 *                   contato:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [Pendente, Confirmado, Disponível, Indisponível]
 */
router.get('/atendimentos', getHorarios);

/**
 * @swagger
 * /atendimentos/{id}:
 *   delete:
 *     summary: Deleta um atendimento pelo ID
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do atendimento a ser deletado
 *     responses:
 *       200:
 *         description: Atendimento deletado com sucesso
 *       404:
 *         description: Atendimento não encontrado
 */
router.delete('/atendimentos/:id', deleteHorario);

/**
 * @swagger
 * /atendimentos/{id}/agendar:
 *   patch:
 *     summary: Atualiza o status de um atendimento para "agendado"
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do atendimento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Confirmado, Indisponível]
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *       404:
 *         description: Atendimento não encontrado
 */
router.patch('/atendimentos/:id/agendar', atualizarStatus);

module.exports = router;
