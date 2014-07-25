angular.module('GuessGame')
    .factory('currentGame', function (
        currentGameRef,
        currentRound,
        gameScores,
        Game,
        nameRequestRound,
        $location
    ) {
        'use strict';
        function roundOver(){ }
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
                            // will change route for others
                            currentGameRef.set( Game.get() );
                            $location.path("war"); // change route for self
                        })
            },
            makeGuess: function(guess){
                guess = guess.trim();
                if ( guess == "" ) return false;
                gameScores.add(guess);
            },
            resetButton: function(){
                Game.setDefault();
                currentGameRef.set( Game.get() )
                currentRound.remove();
                gameScores.remove();
            },
            roundEnd: function(){
                // add scores to game and set round status to complete
                // Game.addRoundScores(
                //     gameScores.getRoundScores()
                // )
                // currentGameRef.set( Game.get() );

                // currentRound.endRound() // reset
                // if the final round endGame

                // $timeout
                //      updateCurrentRound
                //      game listener will change location to battlefield
            },
        
        //  final game change will signify the end of the total game
        //      show final scores with a 'waitin room button'
        };
        // TODO: SET SECURITY RULES
    })
;
