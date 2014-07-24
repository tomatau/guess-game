angular.module('GuessGame')
    .factory('roundListener', function (
        $rootScope,
        currentRoundRef,
        currentRound,
        Round,
        $location,
        $q
    ) {
        'use strict';

        var def = $q.defer();
        // sync Game model
        currentRoundRef.once('value', function(dataSnapshot){
            // console.log('ONCE', dataSnapshot.val(), Round.data)
            if ( ! angular.equals(Round.data, dataSnapshot.val()) )
                Round.setData(dataSnapshot.val());

            currentRoundRef.on('value', handleChange);
            // may be a problem, if currentpage is waiting room but game is in battle
            // provide a defer to use in resolve
            def.resolve();
        })

        function handleChange(dataSnapshot){
            var newRoundData = dataSnapshot.val();
            // console.log('status', newRoundData, Round.data)
            if ( angular.equals(Round.data, newRoundData) ) // no change
                return false;

            Round.setData(newRoundData);

            if (newRoundData == null) {
                Round.reset();
                $location.path('/')
            }

            if ( ! $rootScope.$$phase ) {
                $rootScope.$apply();
            }
        }

        $rootScope.$on('battlefield:connected', function(){
            if (Round.get('countdown') == null){
                currentRound.startCountdown();
            }
        })

        return def.promise;
    })
;