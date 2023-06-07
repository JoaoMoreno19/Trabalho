const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) return res.status(401).send(); 
        const token = auth.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET);
        req.userId = payload.userId;
        next();
    } catch (error) {
        res.status(401).send();
    }
}

module.exports = auth;