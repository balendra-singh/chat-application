angular.module('chatApp').component('messages', {
    templateUrl: 'js/components/messages/messages.html',
    bindings: {
        messages: '<'
    }
});