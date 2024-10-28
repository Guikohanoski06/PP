const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

// Importação de todos os routers
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const userRouterPsi = require('./routes/userRouterPsi');
const loginRouterPsi = require('./routes/loginRouterPsi');
const homeRouter = require('./routes/homeRouter');
const postarHorario = require('./routes/postarHorarioRouter')

const app = express();

// Configurar a porta do servidor
app.set('port', process.env.PORT || 3005);

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas para usuários comuns e login
app.use('/api', userRouter);
app.use('/api', loginRouter);

// Rotas específicas para psicólogos e login
app.use('/api', userRouterPsi);
app.use('/api', loginRouterPsi);

// Rota para buscar psicólogos
app.use('/api', homeRouter);

// rota para postar atendimentos
app.use('/api', postarHorario)

module.exports = app;
