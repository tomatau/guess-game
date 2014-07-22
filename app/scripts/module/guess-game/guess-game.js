//'Auth' // don't need it, using user
(function () {
    
    angular.module('GuessGame', [ 'FireGateway', 'Models' ])
        .constant('GG_DIR', "./scripts/module/guess-game")
        // include any self initialising services
        .run(function( usersOnline ){
            'use strict';
            // console.log(arguments)
            // 
            // make the service run so can debugg
        })

    ;
}());