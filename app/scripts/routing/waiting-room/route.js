angular.module('GuessGameApp')
    .constant('WAITING_ROOM', {
        dir: "scripts/routing/waiting-room/"
    })
    .config(function ($routeProvider, WAITING_ROOM) {
        $routeProvider
            .when('/', {
                templateUrl: WAITING_ROOM.dir + "tmpl.html"
            })
    })