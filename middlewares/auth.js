const jwt = require('jsonwebtoken');
const { roles } = require('../constants');

const auth = (req, res, next) => {
    // Recuperar Token
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'Autorização Negada' });
    }

    // Verify token
    try {
        jwt.verify(token, process.env.JWTSECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: 'Autorização Negada' });
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } catch (err) {
        console.error('something wrong with auth middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
};

const admin = (req, res, next) => {
    if (req.user?.role === roles.admin) next();
    else res.status(401).json({ msg: 'Autorização Negada' });
}

module.exports = {
    auth,
    admin,
}