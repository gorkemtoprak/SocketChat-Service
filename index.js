const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server Running on Port', PORT));

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