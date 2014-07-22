angular.module('GuessGame')
    .factory('currentGame', function ( // return query object?
        currentGameRef,
        Game
    ) {
        'use strict';

        currentGameRef.on('value', function(dataSnapshot){
            console.log('value event:', dataSnapshot.val())

            // create a game only if it doesn't exist
            if ( dataSnapshot.val() == null ) {
                console.log('setting', Game.data)
                currentGameRef.set(Game.data)
            }
            // it exists
            else {
                // equality checks don't work even when not strict
                // sync with firebase
                if ( ! angular.equals(Game.data, dataSnapshot.val()) )
                    Game.setData(dataSnapshot.val())
            }
        })
        // API:
        return {
        //     # used by directives
        //     - game control
        //         - resetButton
        //         - startButton
        //     - guesser
        //         - makeGuess
        //     - clue
        //         - bind to current clue (on model)

        //     # used by routes
        //     - resolve
        //         :battleField
        //             - getIsBattleFieldReady (service or model? :o)
            
        //     # used internally
        //         - startButton
        //             - status startButton
        //             - updateFirebase fast so that other clients go into /waiting\
        //             - 
        //             - status 'battlefield'
        //             - setFirstRound
            startButton: function(){
                // if status == waitingRoom
                Game.status('startButton'); // sets it
                // currentGameRef.set(Game.data)
                // Game.setFirstRound();

            },
        //         - makeGuess guess
        //             - validate it
        //                 - getScore
        //                 - updateGame (addRound)
        //                 - updateGameUsers
        //             - wasFinalRound && allUsersHaveGuessed
        //                 - get theFinal Score
        //                 - setCongratulations
        //                 - wait about 2 seconds
        //                 - status waitingRoom

            makeGuess: function(){},
        //         - resetButton
        //             - resetGame
        //             - updateGame
        //             - wait 2 seconds so people can cancel?
        //             - status waitingRoom

            resetButton: function(){},
        };
        // TODO: SET SECURITY RULES
    })
;