angular.module('GuessGame')
    .factory('currentRound', function ( // return query object?
        currentRoundRef,
        Round,
        $interval
    ) {
        'use strict';

        var currentRound = {
            roundCountdown: function(){
                Round.initCountdown();
                currentRound.updateRound();
                var interval = $interval(function(){
                    if ( Round.tick() ) {
                        currentRound.updateRound();
                    } else {
                        $interval.cancel(interval);
                        // broadcast the round over
                    }
                }, 1000)
            },
            updateRound: function() {
                currentRoundRef.child('countdown').set(Round.get('countdown'));
            }
        };
        return currentRound;
    })
;
