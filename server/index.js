const Sequelize = require('sequelize');
const db = new Sequelize("mysql://root:root@localhost:8889/chat_app");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jwt = require('express-jwt');

// Define messages table on database.
const Message = db.define('message', {
    uid: Sequelize.INTEGER,
    message: Sequelize.TEXT
});

// Define users table on database.
const User = db.define('user', {
    name: Sequelize.STRING
});

// Create or migrate database.
db.sync();

// Start an http-server at port :3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

// Server app folder.
app.use(express.static(__dirname + './../app'));


