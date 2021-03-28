const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    let accessToken = jwt.sign(
        { user },
        'epi-planner_TOKEN_SECRET',
        {expiresIn: '1d'}
    );
    if (!accessToken)
        return res.status(402).send({ message: "An error occured while generating the token." });
    return accessToken;
};

exports.loginAdmin = async (req, res) => {
    Admin.findOne({
        where: {
            name: req.body.username,
            password: req.body.password
        }
    }).then((user) => {
        if (!user) {
            return res.status(404).json({
                success: false,
                data: "No account found with theses credentials"
            });
        }
        let accessToken = this.generateToken(user);
        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken
            }
        });
    }).catch((err) => {
        console.error(err);
        return res.status(422).json({
            success: false,
            data: err.toString()
        });
    })
};
