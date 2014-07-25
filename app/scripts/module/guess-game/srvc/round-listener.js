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
            // console.log('ONCE', dataSnapshot.val(), Round.get())
            if ( ! angular.equals(Round.get(), dataSnapshot.val()) )
                Round.setData(dataSnapshot.val());

            currentRoundRef.on('value', handleChange);
            // may be a problem, if currentpage is waiting room but game is in battle
            // provide a defer to use in resolve
            def.resolve();
        })

        function handleChange(dataSnapshot){
            var newRoundData = dataSnapshot.val(),
                changed = getChangedValues(newRoundData);

            if ( newRoundData == null ) { // reset early
                Round.reset();
                $location.path('/');
            }

            if ( !changed.length ) // no change
                return false;

            Round.setData(newRoundData);

            if ( changed.status == "complete" ) {
                Round.reset(); // game will be updated
                $location.path('what-is-it-good-for');
            }

            if ( ! $rootScope.$$phase ) { $rootScope.$apply(); }
        }

        function getChangedValues(newRound) {
            return v.filter(newRound, function(key, value){
                return ( 
                    value != Round.get(key)
                    && !angular.equals(value, Round.get(key))
                ) ? true : false;
            });
        }

        $rootScope.$on('battlefield:connected', function(){
            if (Round.get('countdown') == null){
                currentRound.startCountdown();
            }
        })

        return def.promise;
    })
;