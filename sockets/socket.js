const {
    userConnect,
    userDisconnect,
} = require("../controllers/socketController");

const { comprobarJWT } = require("../helpers/jwt");
const { io } = require("../index");

io.on("connection", (client) => {
    console.log("Client connect succesful");

    console.log(client.handshake.headers);
    const token = client.handshake.headers["x-token"];
    const [result, uid] = comprobarJWT(token);

    if (!result) {
        return client.disconnect();
    }
    userConnect(uid);

    client.join(uid);

    client.on("disconnect", () => {
        console.log("Client disconnect");
        userDisconnect(uid);
    });
});
