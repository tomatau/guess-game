//'Auth' // don't need it, using user
angular.module('GuessGame', [ 'FireGateway', 'Models' ])
    .run(function(chatRoom, usersOnline, $rootScope, UserList){
        // console.log(arguments)
        // make the service run so can debugg
        // console.log(chatRoom)
        $rootScope.users = UserList.online;
    })

;