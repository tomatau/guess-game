angular.module('GuessGame')
    .factory('gameListener', function (
        $rootScope,
        currentGameRef,
        currentGame,
        Game,
        $location,
        $q
    ) {
        'use strict';
        var def = $q.defer();
        // sync Game model
        currentGameRef.once('value', function(dataSnapshot){
            // console.log('ONCE', dataSnapshot.val(), Game.data)
            if ( dataSnapshot.val() == null )
                currentGame.initGame();
            else if ( ! angular.equals(Game.data, dataSnapshot.val()) )
                Game.setData(dataSnapshot.val());

            currentGameRef.on('value', handleChange);
            // may be a problem, if currentpage is waiting room but game is in battle
            // provide a defer to use in resolve
            def.resolve();
        })


        function handleChange(dataSnapshot){
            var newGameData = dataSnapshot.val(),
                previousData = angular.copy(Game.data);
            // console.log('status', newGameData, Game.data)
            if ( angular.equals(Game.data, newGameData) ) // no change
                return false;            
            Game.setData(newGameData);

            if ( previousData['status'] != newGameData['status'] )
                $rootScope.$apply(function(){
                    switch(Game.get('status')){
                    case 'startButton': $rootScope.$broadcast('status:' + newGameData); break;
                    case 'battleField': $location.path("war"); break;
                    case 'waitingRoom': $location.path("/"); break;
                    default: break;
                    }
                });

            // if currentRound changed
            //      startTimerin Round
        }

        return def.promise;
    })
;