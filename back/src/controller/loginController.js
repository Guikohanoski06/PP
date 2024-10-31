const connection = require('../config/db');

async function login(request, response) {
    const params = [
        request.body.email, 
        request.body.password
    ];

    const query = "SELECT name, email, password FROM users WHERE email = ? AND password = ?";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response
                .status(500)
                .json({
                    success: false,
                    message: "Erro no servidor",
                    data: err
                });
        }

        if (results.length > 0) {
            const user = results[0]; // Pega o primeiro resultado
            response
                .status(200)
                .json({
                    success: true,
                    message: "Login realizado",
                    data: {
                        name: user.name,
                        email: user.email,
                        password: user.password
                    }
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Email ou senha incorretos",
                    data: null
                });
        }
    });
}

module.exports = {
    login
};
