angular.module('GuessGame')
    .factory('gameScores', function (
        guesserRef,
        User,
        Round,
        Scores
    ) {
        'use strict';
        var gameScores = {
            remove: function(){
                Scores.setScores([]);
                guesserRef.remove();
            },
            add: function( guess ){
                var scoreGuess = Scores.toScore( User.get(), {
                        guess: guess,
                        round: Round.get('roundNumber'),
                        score: Round.getScore(guess)
                    } );
                guesserRef.push(scoreGuess);
            }
        };
        return gameScores;
    })
;
