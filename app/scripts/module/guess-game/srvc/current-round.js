angular.module('GuessGame')
    .factory('currentRound', function (
        currentRoundRef,
        Round,
        $interval,
        $rootScope
    ) {
        'use strict';
        var interval;

        var currentRound = {
            update: function(){
                currentRoundRef.set( Round.get() );
            },
            startCountdown: function(){
                Round.initCountdown();
                currentRound.updateCountdown();
                interval = $interval(function(){
                    if ( Round.tick() ) {
                        currentRound.updateCountdown();
                    } else {
                        $interval.cancel(interval);
                        $rootScope.$broadcast('round:complete');
                    }
                }, 3000);
            },
            updateCountdown: function() {
                currentRoundRef
                    .child('countdown')
                    .set(Round.get('countdown'));
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
