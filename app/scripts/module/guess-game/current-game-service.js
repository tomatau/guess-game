angular.module('GuessGame')
    .factory('currentGame', function ( // return query object?
        currentGameRef,
        Game,
        wordRequest
    ) {
        'use strict';
        // API:
        return {
            // listener
            initGame: function(){
                currentGameRef.set(Game.data);
            },
            syncGame: function(remoteData) {
                Game.setData(remoteData)
            },
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
                if (Game.get('status') != 'waitingRoom') return false;
                // initially set to started, will give users a chance to cancel
                Game.startStatus();
                currentGameRef.set(Game.data);

                if ( Game.nextRound() )
                    wordRequest.getWordPromise()
                        .then(function (word) {
                            Round.nextRound(Game.data, word);
                            // save the game and save the round
                            console.log(Round)
                            console.log(Game)
                        })
                // update current round
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
