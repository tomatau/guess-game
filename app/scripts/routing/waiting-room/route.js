angular.module('GuessGameApp')
    .constant('WAITING_ROOM', {
        dir: "scripts/routing/waiting-room/"
    })
    .config(function ($routeProvider, WAITING_ROOM) {
        $routeProvider
            .when('/', {
                templateUrl: WAITING_ROOM.dir + "tmpl.html",
                resolve: {
                    gameReady: [
                        'Game',
                        'gameListener',
                        'roundListener',
                        '$q',
                        '$location',
                        function(Game, gameListener, roundListener, $q, $location){
                            var def = $q.defer();
                            $q.all([gameListener]).then(function(){
                                if ( Game.get('status') == 'battleField' ) {
                                    $location.path('war')
                                } else {
                                    def.resolve(true);
                                }
                            })
                            return def.promise;
                        }
                    ]
                },
                controller: 'WrCont'
            })
    })
    .controller('WrCont', function(Game, Round){
        // console.log('wr controller:')
        // console.log(Game.data)
        // console.log(Round.data)
    })