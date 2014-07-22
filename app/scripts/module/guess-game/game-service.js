angular.module('GuessGame')
    .factory('currentGameRef', function(GameRef){
        return GameRef.child('currentGame');
    })
    .factory('currentGame', function (
        currentGameRef,
        Game
    ) {
        'use strict';

        // load the game
        // 
        // listen to rootScope events to start a game
        // 
        // 
        // 

        // return an object for resolves
        // 
        // waiting room just needs to initialise a game
        // 
        // battlefield needs a current game to have been started
        // 
        // 
        // TODO: SET SECURITY RULES

    })
;