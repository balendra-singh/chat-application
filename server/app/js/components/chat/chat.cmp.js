'use strict';
/**
 * Chat controller.
 *
 * @param Socket socket
 *  Socket object
 * @param $http
 */
function ChatController(socket, $http) {
    var ctrl = this;

    // Channel name set to false to hide if no channel is selected.
    ctrl.channel = false;

    // Channel messages.
    ctrl.messages = [];

    /**
     * On channel selection.
     *
     * @param string value
     *  Channel name.
     */
    ctrl.onChannelSelect = function (value) {

        // Clear message array.
        ctrl.messages = [];

        // Emit join event to server with channel name and username as data.
        socket.emit('join', {channel: value, user: ctrl.username});

        // Change channel to selected channel.
        ctrl.channel = value;
    };

    // Send message.
    ctrl.send = function () {

        // Check for private message.
        if (ctrl.message[0] != '#') {

            // Emit message event to server.
            socket.emit('message', {username: ctrl.username, message: ctrl.message, channel: ctrl.channel});
        } else {

            // Emit private message event to server.
            socket.emit('private', {username: ctrl.username, message: ctrl.message})
        }

        // Clean message input
        ctrl.message = '';
    };

    /**
     * Message event.
     *
     * @param object data
     *  Data send from socket.
     */
    socket.on('message', function (data) {

        // Add new message to list.
        ctrl.messages.push(data);

        // Scroll list to end.
        var height = angular.element('.message').height();
        var count = angular.element('.message').length;
        angular.element('.scroll-list').animate({ scrollTop: height * count  }, "slow");

    });

    // On controller initialisation.
    ctrl.$onInit = function () {

        // Get channels from server.
        $http.get('/channels').then(function (response) {

            // Add channels to channels list variable.
            ctrl.channels = response.data;
        });
    }
}

/**
 * Create chat component.
 *
 * @bindings string username
 *  Username.
 */
angular.module('chatApp').component('chat', {
    templateUrl: 'js/components/chat/chat.html',
    controller: ChatController,
    bindings: {
        username: '<'
    }
});
