// I will be using express.js for creating our service
const express = require("express");
const path = require("path");
const http = require('http');
require("dotenv").config();

//MongoDB Connection
require("./config/database").connectDB();

//Set available port to connect our server
const PORT = 3000 || process.env.PORT;

const app = express();
//define data type
app.use(express.json());

const server = http.createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use("/api/users", require("./routers/users"));
app.use("/api/sessions", require("./routers/authentication"));
app.use("/api/messages", require("./routers/messages"));

server.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log("Server Running on Port:", PORT);
});

const io = require('socket.io')(server);
io.on('connection', (socket) => {
    console.log('Connection success', socket.id)
    socket.on('disconnected', () => {
        console.log('Disconnection', socket.id)
    });

    socket.on('message', (data) => {
        console.log('Data', data)
        socket.broadcast.emit('message-receive', data)
    });
});