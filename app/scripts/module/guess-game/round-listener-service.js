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
                // THINGS
                //  : start timer - drctv controller on roundNumber change, inside round
                //  : make a guess - guess directive -> currentGame(round) / roundScores.user in firebase
                //      : update User's Score
                //  : display round over / word and score - listen to round.countdown/over
                //      : wait a second
                //  : start the next round - currentGame
                //      : 
            });
        //  if the round changes to have an 'over' (or we push the completedRound onto game)
        //      .. display the word from the round
        //      .. on exit, some AOP to make a loader to display word and score
        //    the guy who triggers this round over, should:
        //      - sleep, 
        //      - then update round again (nextRound)
        //      - then update game,
        //  
        //  when game updates current round, start the next round
        // 
        //  final game change will signify the end of the total game
        //      should allow pople to join the waiting room after displaying all this stuff
        //   
        //  user list for individual score
        //      will need this for total score so make a new list for just game
        //     
        //  
        }

        return def.promise;
    })
;