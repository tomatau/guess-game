angular.module('GuessGameApp')
    .constant('BATTLEFIELD', {
        dir: "scripts/routing/battlefield/"
    })
    .config(function ($routeProvider, BATTLEFIELD) {
        $routeProvider
            .when('/war', {
                templateUrl: BATTLEFIELD.dir + "tmpl.html"
            })
    })