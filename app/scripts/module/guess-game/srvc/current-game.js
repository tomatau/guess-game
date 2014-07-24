angular.module('GuessGame')
    .factory('currentGame', function (
        currentGameRef,
        currentRound,
        Game,
        nameRequestRound,
        $location
    ) {
        'use strict';
        function roundOver(){
            // 
        }

        return {
            initGame: function(){
                currentGameRef.set(Game.get());
            },
            startButton: function(){
                if (Game.get('status') != 'waitingRoom') return false;
                // initially set to started, will give users a chance to cancel
                Game.startStatus();
                currentGameRef.set( Game.get() );
                if ( Game.nextRound() )
                    nameRequestRound.getRoundPromise( Game.get('currentRound') )
                        .then(function(round) {
                            currentRound.update();
                            Game.battleStatus();
                            currentGameRef.set( Game.get() ); // will change route for others
                            $location.path("war"); // change route for self
                        })
            },
        //  if the round changes to have an 'over' (or we push the completedRound onto Game)
        //    the guy who triggers this round over, should:
        //      .. on exit, some AOP to display the word from the round and each users score
        //      - sleep, 
        //      - then update round again (nextRound)
        //      - then update game,
        //  
        //  when game updates current round, start the next round
        // 
        //  final game change will signify the end of the total game
        //      should allow pople to join the waiting room after displaying all this stuff
        //   
        //  user list for individual score
        //      will need this for total score so make a new list for just game
        //     
        //  
                // THINGS
                //  : start timer - drctv controller on roundNumber change, inside round
                //  : make a guess - guess directive -> currentGame(round) / roundScores.user in firebase
                //      : update User's Score
                //  : display round over / word and score - listen to round.countdown/over
                //      : wait a second
                //  : start the next round - currentGame (inside makeGuess) -> roundListener
                //      : 


        //         - makeGuess guess
        //             - validate it
        //                 - getScore
        //                 - updateGame (addRound)
        //                 - updateGameUsers
        //             - wasFinalRound && roundOver
        //                 - get theFinal Score
        //                 - setCongratulations
        //                 - wait about 2 seconds
        //                 - status waitingRoom
            makeGuess: function(){},


            resetButton: function(){
                Game.setDefault();
                currentGameRef.set( Game.get() )
                currentRound.remove();
            },
        };
        // TODO: SET SECURITY RULES
    })
;
