'use strict';

/**
 * Create message component.
 *
 * @bindings array messages
 *  Object array with all the channel messages.
 */
angular.module('chatApp').component('messages', {
    templateUrl: 'js/components/messages/messages.html',
    bindings: {
        messages: '<'
    }
});
