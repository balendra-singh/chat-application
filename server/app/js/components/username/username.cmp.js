'use strict';
function UsernameController($location, socket) {
    var ctrl = this;

    ctrl.save = function () {
        socket.emit('name', {name: ctrl.username});
        socket.on('nameValidation', function (data) {
            console.log(data);
            if (data) {
                $location.path('/chat/' + ctrl.username);
            }
        });
    }
}

angular.module('chatApp').component('username', {
    templateUrl: 'js/components/username/username.html',
    controller: UsernameController
});
