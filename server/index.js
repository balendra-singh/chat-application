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
var rooms = {
    Angular: [],
    React: [],
    Laravel: [],
    Symfony: []
};

httpServer.listen(3000, function () {
});

app.use(express.static(__dirname + '/app/'));

app.get('/channels', function (req, res) {
    res.send(channels);
});

io.on('connection', function (socket) {
    socket.on('name', function (data) {
        if (users.indexOf(data.name) == -1) {
            users.push(data.name);
            socket.emit('nameValidation', true);
        } else {
            socket.emit('nameValidation', false);
        }
    });

    socket.on('join', function(data) {
        socket.join(data.channel);
        rooms[data.channel].push({name: data.user, id: socket.id});
        console.log(rooms.Laravel[0].id);
    });

    socket.on('message', function(data) {
        console.log(data);
        io.sockets.in(data.channel).emit('message', {message: data.message, user: data.username});
    });

    socket.on('disconnect', function() {
        console.log(socket.id);
        console.log(users)
    })
});
