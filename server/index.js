var express = require("express");
var http = require("http");
var app = express();
var httpServer = http.Server(app);
var io = require('socket.io')(httpServer);

var users = [];
var channels = [
    'Angular',
    'React',
    'Laravel',
    'Symfony'
];

httpServer.listen(3000, function () {
});

app.use(express.static(__dirname + '/app/'));

app.get('/channels', function (req, res) {
    res.send(channels);
});

io.on('connection', function (socket) {

    socket.on('join', function (data) {
        socket.join(data.channel);
        users.push({id: socket.id, name: data.user});
        socket.username = data.user;
        if (typeof socket.channel != 'undefined') {
            socket.leave(socket.channel);
        }
        socket.channel = data.channel;
    });

    socket.on('message', function (data) {
        io.sockets.in(data.channel).emit('message', {message: data.message, user: data.username});
    });
    socket.on('private', function (data) {
        var message = data.message.split(" ");
        var to_user = message[0].slice(1);
        users.filter(function (user) {
            if (user.name == to_user) {
                var private_message = "(private) " + data.message.slice(to_user.length + 2);
                io.sockets.connected[socket.id].emit('message', {message: private_message, user: "me -> " + to_user});
                io.sockets.connected[user.id].emit('message', {message: private_message, user: data.username});
            }
        });
    });
    socket.on('disconnect', function () {
        users = users.filter(function (user) {
            if (user.id == socket.id) {
                return false;
            }
            return true
        });
    });
});
