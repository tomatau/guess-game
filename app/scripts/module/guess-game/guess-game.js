//'Auth' // don't need it, using user
(function () {
    
    angular.module('GuessGame', [ 'FireGateway', 'Models', 'xml' ])
        .constant('GG_DIR', "./scripts/module/guess-game")
        .factory('currentGameRef', function(GameRef){
            return GameRef.child('currentGame');
        })
        // include any self initialising services
        .run(function( usersOnline, gameListener ){
            'use strict';
        })

    ;
}());