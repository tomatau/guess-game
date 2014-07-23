angular.module('GuessGameApp')
    .constant('WAITING_ROOM', {
        dir: "scripts/routing/waiting-room/"
    })
    .config(function ($routeProvider, WAITING_ROOM) {
        $routeProvider
            .when('/', {
                templateUrl: WAITING_ROOM.dir + "tmpl.html",
                resolve: {
                    gameReady: function(gameListener){
                        return gameListener;
                    }
                },
                controller: 'WrCont'
            })
    })
    .controller('WrCont', function(Game){
        console.log('wr controller', Game.data)
    })