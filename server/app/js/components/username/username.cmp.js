'use strict';
function UsernameController($location, socket) {
    var ctrl = this;

    ctrl.save = function () {
        $location.path('/chat/' + ctrl.username);
    }
}

angular.module('chatApp').component('username', {
    templateUrl: 'js/components/username/username.html',
    controller: UsernameController
});
