const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1]; // pega o conteúdo depois de "Bearer "

    if (!token) {
        return res.status(401).json({ error: "Token inválido "});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // coloca a informação do user no req
        next(); // segue para a rota
    } catch (err) {
        return res.status(403).json({ error: "Token expirado ou inválido" });
    }
}

module.exports = authMiddleware;