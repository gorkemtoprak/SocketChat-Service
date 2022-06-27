const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/User");

const getUsers = async (req, res) => {
    const user = await User.find({
        _id: { $ne: req.uid },
    }).sort("-online");
    return res.json(user);
};

const createUser = async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).json({ error: "User already exists" });
        }
        const user = new User(req.body);
        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(user.password, salt);
        await user.save();
        const token = await generateJWT(user.id);

        return res.json({ user, token });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createUser,
    getUsers,
};
