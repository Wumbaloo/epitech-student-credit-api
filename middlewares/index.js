const jwt = require("jsonwebtoken");
const useful = require("../controllers/useful")

exports.checkAuth = async (req, res, next) => {
    let response = await useful.getUserByToken(req.headers['authorization']);

    if (!response.success) {
        let {token} = req.query;
        let response = await useful.getUserByToken(`Bearer ${token}`);

        if (!response.success) {
            return res.status(response.data.statusCode).json({ message: response.data.message });
        } else {
            req.token = token;
            next();
        }
    } else {
        const tokenHeader = req.headers['authorization'];
        const split = tokenHeader.split(' ');
        const token = split[1];

        req.token = token;
        next();
    }
};