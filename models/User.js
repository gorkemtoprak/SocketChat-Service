const { Schema, model } = require("mongoose");

//Define User model restrictions
const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    user.uid = user._id;

    delete user.password;
    delete user.__v;
    delete user._id;

    return user;
};

module.exports = model("User", userSchema);
