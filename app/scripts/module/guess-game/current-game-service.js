angular.module('GuessGame')
    .factory('currentGame', function ( // return query object?
        currentGameRef,
        Game,
        Round,
        nameRequestRound
    ) {
        'use strict';
        return {
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
            startButton: function(){
                if (Game.get('status') != 'waitingRoom') return false;
                // initially set to started, will give users a chance to cancel
                Game.startStatus();
                // currentGameRef.set(Game.data);

                if ( Game.nextRound() )
                    nameRequestRound.getRoundPromise(Game.get('currentRound'))
                        .then(function (round) {
                            // Round.nextRound(Game.data, word);
                            // save the game and save the round
                            console.log(Round.data)
                            // save the round so it's available for everyone
                            console.log(Game.data)
                            // save the game 
                            // trigger everyone's listener
                            //      couold be a route change
                            //      could be from the game changing
                            // 
                            //  initial route change will need to be here
                            //  
                            //  rounte changes will protect us from loading wrong state
                            //      ie. game will be responding to game.data for guess' etc
                            //  
                            //  if the round changes to have an 'over' (or we push the completedRound onto game)
                            //      .. display the word from the round
                            //      .. on exit, some AOP to make a loader to display word and score
                            //    the guy who triggers this round over, should:
                            //      - sleep, 
                            //      - then update round again (nextRound)
                            //      - then update game,
                            //  
                            //  when game updates current round
                            //      
                            // 
                            //  final game change will signify the end of the total game
                            //      should allow pople to join the waiting room after displaying all this stuff
                            //   
                            //  user list for individual score
                            //      will need this for total score so make a new list for just game
                            //     
                            //  
                        })
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
