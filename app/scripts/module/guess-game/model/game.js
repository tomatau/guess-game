;(function(){
    'use strict';
    var WAITING = 'waitingRoom',
        REQUEST = 'startButton',
        INPLAY = 'battleField';

    function Game(){
        this.data = {};
        this.setDefault();
    }

    Game.prototype.get = function(prop) {
        if (prop == null) return this.data;
        return this.data[prop];
    }

    Game.prototype.startStatus = function(){ this.data.status = REQUEST; }
    Game.prototype.battleStatus = function(){ this.data.status = INPLAY; }

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
    }

    Game.prototype.roundComplete = function(round) { // maybe just add roundData (copy)
        this.completeRounds.push({
            userScores: [], // have this also exist in a list for 'game users'
            word: ""
        })
    };

    Game.prototype.nextRound = function() {
        if ( this.data.currentRound == this.data.totalRounds )
            return false;
        ++this.data.currentRound;
        return true;
    }

    angular.module('Models')
        .service('Game', Game)
}());