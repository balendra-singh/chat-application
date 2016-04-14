'use strict';

angular.module('chatApp').component('channelsList', {
    templateUrl: 'js/components/channelsList/channelsList.html',
    bindings: {
        channels: '<',
        selectChannel: '&'
    }
});