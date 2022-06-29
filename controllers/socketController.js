const User = require("../models/User");

//You should add online or not parameter to UserModel
const userConnect = async (uid = "") => {
    const user = await User.findById(uid);
    await user.save();
    return user;
};

//You should add online or not parameter to UserModel
const userDisconnect = async (uid = "") => {
    const user = await User.findById(uid);
    await user.save();
    return user;
};

module.exports = {
    userConnect,
    userDisconnect,
};
