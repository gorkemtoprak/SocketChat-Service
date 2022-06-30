const { Schema, model } = require("mongoose");

//Define Message model restrictions
const messageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

messageSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
};

module.exports = model("Message", messageSchema);