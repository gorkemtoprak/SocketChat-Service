const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { uid },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            }
        );
    });
};

const comprobarJWT = (token = "") => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        return [true, uid];
    } catch (error) {
        return [false, error];
    }
};

module.exports = {
    generateJWT,
    comprobarJWT,
};
