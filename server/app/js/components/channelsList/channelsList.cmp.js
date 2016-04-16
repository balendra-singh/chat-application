'use strict';

/**
 * Create channelList component.
 *
 * @bindings array channels.
 *  String list with all available channels.
 * @bindings function selectChannel
 *  Callback function triggered when a channel has been selected.
 */
angular.module('chatApp').component('channelsList', {
    templateUrl: 'js/components/channelsList/channelsList.html',
    bindings: {
        channels: '<',
        selectChannel: '&'
    }
});