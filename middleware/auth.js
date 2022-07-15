const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    try {
        const jwtverify = await jwt.verify(token, process.env.SECRET_KEY);
        const { userId, username } = jwtverify;
        req.user = { userId, username };
        next();
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = auth;

