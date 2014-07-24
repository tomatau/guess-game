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
            var newGameData = dataSnapshot.val();
            // console.log('ONCE', dataSnapshot.val(), Game.get())
            if ( newGameData == null )
                currentGame.initGame();
            else if ( ! angular.equals(Game.get(), newGameData) )
                Game.setData(newGameData);

            currentGameRef.on('value', handleChange);
            // may be a problem, if currentpage is waiting room but game is in battle
            // provide a defer to use in resolve
            def.resolve();
        })


        function handleChange(dataSnapshot){
            var newGameData = dataSnapshot.val(),
                previousData = angular.copy(Game.get());
            // console.log('status', newGameData, Game.get())
            if ( angular.equals(Game.get(), newGameData) ) // no change
                return false;
            else
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
        }

        return def.promise;
    })
;