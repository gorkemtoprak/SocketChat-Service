const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/User");

const createSession = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User does not exists" });
        }
        if (!bcryptjs.compareSync(password, user.password)) {
            return res.status(400).json({ error: "Password is incorrect" });
        }
        const token = await generateJWT(user.id);
        return res.json({ user, token });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

const renewToken = async (req, res) => {
    const { uid } = req;

    try {
        const user = await User.findById(uid);
        if (!user) {
            return res.status(400).json({ error: "User does not exists" });
        }
        const token = await generateJWT(uid);
        return res.json({ user, token });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createSession,
    renewToken,
};
