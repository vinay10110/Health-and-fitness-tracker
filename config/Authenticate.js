const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            return reject({ status: 403, message: 'Access denied, token missing.' });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err) => {
            if (err) {
                return reject({ status: 401, message: 'Unauthorized access, invalid token.' });
            }
            resolve(); 
        });
    });
};

module.exports = { verifyToken };