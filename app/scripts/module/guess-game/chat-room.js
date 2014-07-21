angular.module('GuessGame')
    .constant('CHAT_KEY', 'chatRoom')
    // change to gateways
    .factory('chatRoom', function (firebaseGuessGame, CHAT_KEY, usersOnline) {
        var chatRoom = firebaseGuessGame.$child(CHAT_KEY);
        // console.log(chatRoom)
        // use a messages array of objects
        //  each object contains user and message info
        // 
        // a clear service so that the game can start fresh on each round
        return {}
    })
;