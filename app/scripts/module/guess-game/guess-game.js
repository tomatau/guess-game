(function () {    
    angular.module('GuessGame', [ 'FireGateway', 'Models', 'xml' ])
        .constant('GG_DIR', "./scripts/module/guess-game")
        .factory('currentGameRef', function(GameRef){
            return GameRef.child('currentGame');
        })
        .factory('currentRoundRef', function(GameRef){
            return GameRef.child('currentRound');
        })
        // include any self initialising services
        .run(function( usersOnline ){
            'use strict';
        })
}());