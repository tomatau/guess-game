angular.module('GuessGame')
    .factory('currentGuess', function (
        guesserRef,
        Scores
    ) {
        'use strict';
        var currentGuessRef = guesserRef.child('guesss');

        var currentGuess = {
            remove: function(){
                Scores.setScores([]);
                currentGuessRef.remove();
            }
        };
        return currentGuess;
    })
;
