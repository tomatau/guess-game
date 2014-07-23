;(function(){
    'use strict';
    var WAITING = 'waitingRoom',
        REQUEST = 'startButton',
        INPLAY = 'battleField';

    Game.prototype.startStatus = function(){
        this.data.status = REQUEST;
    }
    //     Game.setStatus(REQUEST);
        // this should update remotely
        // 
        // then generateAWord
        // then setFirstRound
        //      this updates and then the listenerChanges the route with the new game
    // }
    // Game.prototype.battleField = Game.setStatus.bind(INPLAY);
    /**
     * The Current Game
     */
    function Game(){
        this.data = {};
        this.setDefault();
    }

    Game.prototype.setData = function(data) {
        angular.extend(this.data, data);
    }

    Game.prototype.setDefault = function() {
        // keep object reference but clear all properties
        for (var member in this.data) delete this.data[member];
        angular.extend(this.data, {
            currentRound: 0,
            startedTime: Date.now(),
            status: WAITING,
            totalRounds: 5
        });
    };

    Game.prototype.get = function(prop) {
        return this.data[prop];
    };

    Game.prototype.nextRound = function() {
        console.log(this.data.currentRound, this.data.totalRounds)
        if ( this.data.currentRound == this.data.totalRounds )
            return false;
        console.log(++this.data.currentRound)
        console.log(this.data.currentRound)
        return true;
    };

    angular.module('Models')
        .service('Game', Game)
        ;
}());