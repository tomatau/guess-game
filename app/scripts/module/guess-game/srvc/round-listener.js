angular.module('GuessGame')
    .factory('roundListener', function (
        $rootScope,
        currentRoundRef,
        Round,
        $q
    ) {
        'use strict';
        console.log('ROUND LISTENER')
        var def = $q.defer();
        // sync Game model
        currentRoundRef.once('value', function(dataSnapshot){
            console.log('ONCE', dataSnapshot.val(), Round.data)
            if ( ! angular.equals(Round.data, dataSnapshot.val()) )
                Round.setData(dataSnapshot.val());

            currentRoundRef.on('value', handleChange);
            // may be a problem, if currentpage is waiting room but game is in battle
            // provide a defer to use in resolve
            def.resolve();
        })

        function handleChange(dataSnapshot){
            var newRoundData = dataSnapshot.val();
            // console.log('status', newGameData, Round.data)
            if ( angular.equals(Round.data, newRoundData) ) // no change
                return false;

            $rootScope.$apply(function(){
                // just update the round, game handles controls
                //      this should always happen first though
            });
        }

        // on a battlefield join event, or round:started
        $rootScope.$on('battlefield:connected', function(){
            // check if countdown is null
            console.log(Round.get('countdown'))
            if (Round.get('countdown') == null){
                currentRoundRef.roundCountdown();
            }
        })
        // if it is, start the timer

        return def.promise;
    })
;