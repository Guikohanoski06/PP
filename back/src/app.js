const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

// Importação das rotas
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const userRouterPsi = require('./routes/userRouterPsi');
const loginRouterPsi = require('./routes/loginRouterPsi');
const homeRouter = require('./routes/homeRouter');
const postarHorario = require('./routes/postarHorarioRouter');
const atualizarPerfil = require('./routes/atualizarPerfilRouter');
const verHorario = require('./routes/verHorarioRouter');

const app = express();

// Configurar a porta do servidor
app.set('port', process.env.PORT || 3005);

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', userRouter);
app.use('/api', loginRouter);
app.use('/api', userRouterPsi);
app.use('/api', loginRouterPsi);
app.use('/api', homeRouter);
app.use('/api', postarHorario);
app.use('/api', verHorario);  // Verifique se está com o /api correto
app.use('/api', atualizarPerfil);

module.exports = app;
