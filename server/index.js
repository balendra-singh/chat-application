'use strict';

var express = require("express");
var http = require("http");
var app = express();
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);

// Users array.
var users = [];

// Channels pre-defined array.
var channels = [
    'Angular',
    'React',
    'Laravel',
    'Symfony'
];

// Start http server.
httpServer.listen(3000, function () {
});

// Use static files 'app' folder for '/' path.
app.use(express.static(__dirname + '/app/'));

// Channels endpoint.
app.get('/channels', function (req, res) {
    res.send(channels);
});

// On connection event.
io.on('connection', function (socket) {

    // Join event.
    socket.on('join', function (data) {

        // Join socket to channel.
        socket.join(data.channel);

        // Add user to users lists.
        users.push({id: socket.id, name: data.user});

        // Bind username to socket object.
        socket.username = data.user;

        // If socket already exists in a channel, leave.
        if (typeof socket.channel != 'undefined') {
            socket.leave(socket.channel);
        }

        // Bind channel to socket.
        socket.channel = data.channel;
    });

    // Message event.
    socket.on('message', function (data) {

        // Send to selected channel user's message.
        io.sockets.in(data.channel).emit('message', {message: data.message, user: data.username});
    });

    // Private message event.
    socket.on('private', function (data) {

        // Split message to take receiver name.
        var message = data.message.split(" ");

        // Get username from message array.
        var to_user = message[0].slice(1);

        // Filter users to find user's socket id and send message.
        users.filter(function (user) {
            if (user.name == to_user) {

                // Format message.
                var private_message = "(private) " + data.message.slice(to_user.length + 2);

                // Send message to user who sent the message.
                io.sockets.connected[socket.id].emit('message', {message: private_message, user: "me -> " + to_user});

                // Send message to receiver.
                io.sockets.connected[user.id].emit('message', {message: private_message, user: data.username});
            }
        });
    });

    // Disconnect event.
    socket.on('disconnect', function () {

        // Check if user joined any room and clean users array.
        users = users.filter(function (user) {
            if (user.id == socket.id) {
                return false;
            }
            return true
        });
    });
});
