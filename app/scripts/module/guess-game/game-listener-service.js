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
            var newGameData = dataSnapshot.val();
            // console.log('status', newGameData, Game.data)
            if ( angular.equals(Game.data, newGameData) ) // no change
                return false;

            $rootScope.$apply(function(){
                Game.setData(newGameData);
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