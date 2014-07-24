;(function(){
    'use strict';
    var countDownTimeMs = 10;
    /**
     * The Current Round
     */
    function Round(){
        this.data = {};
        this.reset();
    }

    Round.prototype.get = function(prop) {
        if (prop == null) return this.data;
        return this.data[prop];
    };

    Round.prototype.reset = function() {
        // keep object reference but clear all properties
        for (var member in this.data) delete this.data[member];
        angular.extend(this.data, {
            word: null,
            clues: null,
            roundNumber: null,
            countdown: null
        });
    };

    Round.prototype.setData = function(data) {
        angular.extend(this.data, data);
    }

    Round.prototype.setRound = function(word, clues, roundNumber) {
        this.data.word = word;
        this.data.clues = clues;
        this.data.roundNumber = roundNumber;
    };

    Round.prototype.nextRound = function(gameData, word) {
        if ( this.data.roundNumber >= gameData.currentRound )
            return false;

        this.word = word;
        // watch the round number?
        this.data.roundNumber = gameData.currentRound;
    }

    Round.prototype.initCountdown = function() {
        this.data.countdown = countDownTimeMs;
    }

    Round.prototype.tick = function() {
        if (this.data.countdown < 1 || this.data.countdown == null)
            return false;
        this.data.countdown--;
        return true;
    }

    Round.prototype.getScore = function(guess) {
        if ( guess == this.data.word )
            return this.data.countdown;
        return 0;
    }

    angular.module('Models')
        .service('Round', Round)
        ;
}());