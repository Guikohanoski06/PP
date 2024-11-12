const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const userRouterPsi = require('./routes/userRouterPsi');
const loginRouterPsi = require('./routes/loginRouterPsi');
const homeRouter = require('./routes/homeRouter');
const postarHorario = require('./routes/postarHorarioRouter');
const atualizarPerfil = require('./routes/atualizarPerfilRouter');
const verHorario = require('./routes/verHorarioRouter');
const verAtendimento = require('./routes/atendimentosRouter');

const app = express();

app.set('port', process.env.PORT || 3005); 

app.use(cors()); // Habilita o CORS para permitir requisições de diferentes origens
app.use(express.json()); // Middleware para processar requisições com JSON no body

// Rotas
app.use('/api', userRouter);
app.use('/api', loginRouter);
app.use('/api', userRouterPsi);
app.use('/api', loginRouterPsi);
app.use('/api', homeRouter);
app.use('/api', postarHorario);
app.use('/api', verHorario);
app.use('/api', atualizarPerfil);
app.use('/api', verAtendimento);

module.exports = app;
