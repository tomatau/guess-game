angular.module('GuessGame')
    .factory('gameListener', function (
        currentGameRef,
        currentGame,
        Game
    ) {
        'use strict';
        // sync Game
        currentGameRef.once('value', function(dataSnapshot){
            if ( dataSnapshot.val() == null )
                currentGame.initGame();
            else if ( ! angular.equals(Game.data, dataSnapshot.val()) )
                currentGame.syncGame(dataSnapshot.val());
        })

        // API:
        // - onStatusChange .child('status').on('value')
        //      - ifNewValue
        //      - ifWaitingRoom
        //          changeLocation to waiting room
        //      - ifBattleField
        //          changeLocation to battlefield
        //      - ifWaiting
        //          broadcastWaitingEvent
        //              disable startButton
        //              display loading route?

    })
;