const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API",
            version: "1.0.0",
            description: "API",
        },
        servers: [{ url: "http://localhost:3004"}], // ajuste o URL do servidor corretamente
    },
    apis: [`${__dirname}/../routes/*.js`], // Caminho ajustado para as rotas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
