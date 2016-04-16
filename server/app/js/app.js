'use strict';

var app = angular.module('chatApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            template: '<username></username>',
            title: 'Select name'
        })
        .when('/chat/:username', {
            template: '<chat username="$resolve.name"></chat>',
            resolve: {
                name: function ($route) {
                    return $route.current.params.username;
                }
            },
            title: 'Rooms'
        });
});

app.run(function ($rootScope, $route) {

    // Default page title.
    $rootScope.page_title = 'ChatApp';

    // On page change success change page title based on current page.
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.page_title = $route.current.$$route.title;
    });
});
