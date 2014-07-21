//'Auth' // don't need it, using user
(function () {
    
    angular.module('GuessGame', [ 'FireGateway', 'Models' ])
        .constant('GG_DIR', "./scripts/module/guess-game")
        .run(function( $rootScope, UserList){
            'use strict';
            // console.log(arguments)
            // make the service run so can debugg
        })

    ;
}());