angular.module('GuessGame')
    .factory('gameListener', function (
        $rootScope,
        currentGameRef,
        currentGame,
        Game,
        $location
    ) {
        'use strict';
        // sync Game model
        currentGameRef.once('value', function(dataSnapshot){
            // console.log('ONCE', dataSnapshot.val(), Game.data)
            if ( dataSnapshot.val() == null )
                currentGame.initGame();
            else if ( ! angular.equals(Game.data, dataSnapshot.val()) )
                currentGame.syncGame(dataSnapshot.val());

            currentGameRef.on('value', handleChange);

            // may be a problem, if currentpage is waiting room but game is in battle
            //  should change the location
            // and visa versa
        })

        function handleChange(dataSnapshot){
            var newGameData = dataSnapshot.val();
            // console.log('status', newGameData, Game.data)
            if ( angular.equals(Game.data, newGameData) ) // no change
                return false;

            // if status changed
            switch(newGameData.status){
                case 'startButton':
                    $rootScope.$broadcast('status:' + newGameData);
                    break;
                case 'battleField':
                    $location.path("war");
                    break;
                case 'waitingRoom':
                    // location waiting room
                    break;
                default: break;
            }

            // Game.currentRound changed
            //      broadcast it so views can update
            //      
            // current round listener should have updated too
        }

    })
;