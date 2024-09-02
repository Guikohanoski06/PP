const connection = require('../config/db');

async function login(request, response) {
    const params = Array(
        request.body.email, request.body.password
    );

    const query = "SELECT name, password, id, created_at FROM users WHERE email = ? and password = ?";

    connection.query(query, params, (err, results) => {
        if (results.length > 0 && results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "Login realizado",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem sucesso",
                    data: err
                })
        }
    })
}

module.exports = {
    login
};