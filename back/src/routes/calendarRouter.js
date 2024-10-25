const express = require('express');
const router = express.Router();
const calendarController = require('../controller/calendarController');

// Rota para adicionar disponibilidade
/**
 * @swagger
 * /calendar/disponibilidade:
 *   post:
 *     summary: Adicionar disponibilidade
 *     description: Endpoint para adicionar a disponibilidade de um psicólogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               psicologoId:
 *                 type: string
 *                 description: ID do psicólogo
 *               data:
 *                 type: string
 *                 format: date
 *                 description: Data da disponibilidade
 *               horarios:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: time
 *                   description: Horário disponível
 *     responses:
 *       '201':
 *         description: Disponibilidade adicionada com sucesso.
 *       '400':
 *         description: Requisição inválida.
 */
router.post('/calendar/disponibilidade', calendarController.adicionarDisponibilidade);

// Rota para visualizar consultas disponíveis
/**
 * @swagger
 * /calendar/consultas:
 *   get:
 *     summary: Visualizar consultas disponíveis
 *     description: Endpoint para visualizar todas as consultas disponíveis.
 *     responses:
 *       '200':
 *         description: Lista de consultas disponíveis.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   psicologoId:
 *                     type: string
 *                   data:
 *                     type: string
 *                     format: date
 *                   horario:
 *                     type: string
 *                     format: time
 */
router.get('/calendar/consultas', calendarController.visualizarConsultas);

// Rota para agendar consulta
/**
 * @swagger
 * /calendar/agendar:
 *   post:
 *     summary: Agendar consulta
 *     description: Endpoint para agendar uma consulta com um psicólogo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               psicologoId:
 *                 type: string
 *                 description: ID do psicólogo
 *               data:
 *                 type: string
 *                 format: date
 *                 description: Data da consulta
 *               horario:
 *                 type: string
 *                 format: time
 *                 description: Horário da consulta
 *               clienteId:
 *                 type: string
 *                 description: ID do cliente
 *     responses:
 *       '201':
 *         description: Consulta agendada com sucesso.
 *       '400':
 *         description: Requisição inválida.
 *       '404':
 *         description: Psicólogo ou cliente não encontrado.
 */
router.post('/calendar/agendar', calendarController.agendarConsulta);

// Rota para visualizar horários disponíveis em um dia específico
/**
 * @swagger
 * /calendar/horarios:
 *   get:
 *     summary: Visualizar horários disponíveis em um dia específico
 *     description: Endpoint para visualizar horários disponíveis para um psicólogo em uma data específica.
 *     parameters:
 *       - name: psicologoId
 *         in: query
 *         required: true
 *         description: ID do psicólogo
 *         schema:
 *           type: string
 *       - name: data
 *         in: query
 *         required: true
 *         description: Data para verificar a disponibilidade
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       '200':
 *         description: Lista de horários disponíveis.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 format: time
 *       '400':
 *         description: Requisição inválida.
 */
router.get('/calendar/horarios', calendarController.visualizarHorarios);

module.exports = router;
