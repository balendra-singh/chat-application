'use strict';

function ChatController(socket, $http) {
    var ctrl = this;
    var channel = 'Angular';
    ctrl.messages = [];
    ctrl.onChannelSelect = function (value) {
        ctrl.messages = [];
        socket.emit('join', {channel: value, user: ctrl.username});
        channel = value;
    };

    ctrl.send = function() {
        socket.emit('message', {username: ctrl.username, message: ctrl.message, channel: channel});
        ctrl.message = '';
    };

    socket.on('message', function (data) {
        console.log(data)
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