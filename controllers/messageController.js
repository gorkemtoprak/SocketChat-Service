const Message = require("../models/Message");

const getChat = async (req, res) => {
    const { from } = req.params;
    const myId = req.uid;

    const messages = await Message.find({
        $or: [
            { from: myId, to: from },
            { from: from, to: myId },
        ],
    })
        .sort({ createdAt: "desc" })
        .limit(30);

    return res.json(messages);
};

module.exports = {
    getChat,
};
