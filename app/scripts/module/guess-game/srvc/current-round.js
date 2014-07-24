angular.module('GuessGame')
    .factory('currentRound', function ( // return query object?
        currentRoundRef,
        Round,
        $interval,
        $rootScope
    ) {
        'use strict';
        var interval;

        var currentRound = {
            update: function(){
                currentRoundRef.set( Round.data );
            },
            startCountdown: function(){
                Round.initCountdown();
                currentRound.updateCountdown();
                interval = $interval(function(){
                    if ( Round.tick() ) {
                        currentRound.updateCountdown();
                    } else {
                        $interval.cancel(interval);
                    }
                }, 1000)
            },
            updateCountdown: function() {
                currentRoundRef.child('countdown').set(Round.get('countdown'));
            },
            remove: function(){
                Round.reset();
                $interval.cancel(interval);
                currentRoundRef.remove();
            }
        };
        return currentRound;
    })
;
