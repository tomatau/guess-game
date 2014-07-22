angular.module('GuessGame')
    .factory('gameListener', function (
        currentGameRef,
        Game
    ) {
        'use strict';
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