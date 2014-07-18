angular.module('GuessGame')
    .constant('CHAT_KEY', 'chatRoom')
    .factory('chatRoom', function (firebaseGuessGame, CHAT_KEY, usersOnline) {
        var chatRoom = firebaseGuessGame.$child(CHAT_KEY);
        // console.log(chatRoom)
        // use a messages array of objects
        //  each object contains user and message info
        // 
        return {}
    })
;