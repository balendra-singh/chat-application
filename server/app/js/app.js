'use strict';

var app = angular.module('chatApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            template: '<username></username>'
        })
        .when('/chat/:username', {
            template: '<chat username="$resolve.name"></chat>',
            resolve: {
                name: function($route) {
                    return $route.current.params.username;
                }
            }
        });
});
