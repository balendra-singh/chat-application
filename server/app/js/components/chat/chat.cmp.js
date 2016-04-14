'use strict';

function ChatController(socket, $http) {
    var ctrl = this;
    ctrl.channel = false;
    ctrl.messages = [];
    ctrl.onChannelSelect = function (value) {
        ctrl.messages = [];
        socket.emit('join', {channel: value, user: ctrl.username});
        ctrl.channel = value;
    };

    ctrl.send = function () {
        if (ctrl.message[0] != '#') {
            socket.emit('message', {username: ctrl.username, message: ctrl.message, channel: ctrl.channel});
        } else {
            socket.emit('private', {username: ctrl.username, message: ctrl.message})
        }
        ctrl.message = '';
    };

    socket.on('message', function (data) {
        ctrl.messages.push(data);
    });

    ctrl.$onInit = function () {
        $http.get('/channels').then(function (response) {
            ctrl.channels = response.data;
        });
    }
}

angular.module('chatApp').component('chat', {
    templateUrl: 'js/components/chat/chat.html',
    controller: ChatController,
    bindings: {
        username: '<'
    }
});