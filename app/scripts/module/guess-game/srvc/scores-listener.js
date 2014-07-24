angular.module('GuessGame')
// CURRENT ROUNDS SCORES
    .factory('scoresListener', function (
        $q,
        $rootScope,
        guesserRef,
        Scores,
        UserList
    ) {
        'use strict';

        var def = $q.defer();

        guesserRef.child('guesss').once('value', function(dataSnapshot){
            var guesss = []
            dataSnapshot.forEach(function (childSnapshot) {
                guesss.push(childSnapshot.val())
            });
            console.log('ONCE', guesss)

            if ( ! angular.equals(Scores.get(), guesss) )
                Scores.setScores(guesss);

            console.log('once setting: ', Scores)

            guesserRef.child('guesss').on('child_added', handleChange); // add_child guess
            def.resolve();
        })

        function handleChange(dataSnapshot, previousSiblingSnapshot){
            var newGuessData = dataSnapshot.val();
            console.log('childAdded', newGuessData)
            if ( newGuessData != null )
                return false;

            var guessingUser = UserList.getUser(newGuessData.userId);
            var roundScore = Scores.toScore(guessingUser, newGuessData);
            Scores.addScore(roundScore);

            if ( ! $rootScope.$$phase ) {$rootScope.$apply(); }
            console.log(Scores.scores)
        }

        return def.promise;
    })
;