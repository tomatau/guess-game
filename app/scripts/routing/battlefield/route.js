angular.module('GuessGameApp')
    .constant('BATTLEFIELD', {
        dir: "scripts/routing/battlefield/"
    })
    .run(function($rootScope, $location){
        $rootScope.$on('$routeChangeError', function(){
            // broadcast the resolve error for an alert or smth
            $location.path('/');
        });
    })
    .config(function ($routeProvider, BATTLEFIELD) {
        $routeProvider
            .when('/war', {
                templateUrl: BATTLEFIELD.dir + "tmpl.html",
                resolve: {
                    ready: [
                        'Game',
                        'roundListener',
                        'gameListener',
                        'scoresListener',
                        '$q',
                        function(
                            Game, 
                            roundListener, 
                            gameListener, 
                            scoresListener, 
                            $q 
                        ){
                            var def = $q.defer();
                            $q.all(
                              [ gameListener, roundListener, scoresListener ]
                            ).then(function(){
                                if ( Game.get('status') == 'battleField' ) {
                                    def.resolve(true);
                                } else {
                                    def.reject();
                                }
                            })
                            return def.promise;
                        }
                    ]
                },
                controller: 'BfCont'
            })
    })
    .controller('BfCont', function($rootScope, Game, Round){
        // console.log('br controller', Game.data, Round.data);
        $rootScope.$broadcast('battlefield:connected');
    })