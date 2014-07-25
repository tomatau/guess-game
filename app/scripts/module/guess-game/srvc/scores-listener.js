angular.module('GuessGame')
// Each user who scored in a round, highest score per round
    .factory('scoresListener', function (
        $q,
        $rootScope,
        guesserRef,
        Scores,
        UserList
    ) {
        'use strict';

        var def = $q.defer();

        guesserRef.once('value', function(dataSnapshot){
            var guesss = [];
            dataSnapshot.forEach(function (childSnapshot) {
                guesss.push(childSnapshot.val())
            });

            if ( ! angular.equals(Scores.get(), guesss) )
                Scores.setScores(guesss);

            guesserRef.on('child_added', handleChange);
            def.resolve();
        })

        function handleChange(dataSnapshot, previousSiblingSnapshot){
            var newGuessData = dataSnapshot.val();
            if ( newGuessData == null ) {
                console.log(newGuessData)
                return false;
            }

            Scores.addScore(newGuessData);

            if ( ! $rootScope.$$phase ) {$rootScope.$apply(); }
        }

        return def.promise;
    })
;