const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const app = express();

// Configurar a porta
app.set('port', process.env.PORT || 3005);

// Configurar middlewares
app.use(cors());
app.use(express.json());

// Configurar as rotas
app.use('/api', userRouter);
app.use('/api', loginRouter);

module.exports = app;  // Exporta o app sem iniciar o servidor
