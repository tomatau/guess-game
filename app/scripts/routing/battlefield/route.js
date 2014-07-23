angular.module('GuessGameApp')
    .constant('BATTLEFIELD', {
        dir: "scripts/routing/battlefield/"
    })
    .config(function ($routeProvider, BATTLEFIELD) {
        $routeProvider
            .when('/war', {
                templateUrl: BATTLEFIELD.dir + "tmpl.html",
                resolve: {
                    ready: [
                        'Game',
                        'Round',
                        '$q',
                        ,function(
                            Game,
                            Round,
                            $q
                        ){
                            console.log(Game, Round);
                            var def = $q.defer();
                            if ( Game.get('status') == 'battleField' ) {
                                def.resolve(true);
                            } else {
                                def.reject();
                            }
                            return def.promise;
                        }
                    ]
                }
            })
    })