angular.module('Firebase')
    .constant('APP_URL', "https://guessing-game.firebaseio.com")
    .factory('GameRef', function(APP_URL){
        return new Firebase(APP_URL);
    })
    .factory('firebaseGuessGame', function($firebase, GameRef){
        return $firebase(GameRef);
    })
;