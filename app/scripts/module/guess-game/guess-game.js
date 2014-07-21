//'Auth' // don't need it, using user
angular.module('GuessGame', [ 'FireGateway', 'Models' ])
    .constant('GG_DIR', "./scripts/module/guess-game")
    .run(function(chatRoom, usersOnline, $rootScope, UserList){
        // console.log(arguments)
        // make the service run so can debugg
    })

;