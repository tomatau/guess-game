;(function(){
    'use strict';
    /**
     * The Current Round
     */
    function Round(){
        this.data = {};
        this.setDefault();
    }

    Round.prototype.setDefault = function() {
        // keep object reference but clear all properties
        for (var member in this.data) delete this.data[member];
        angular.extend(this.data, {
            word: null,
            clues: [],
            roundNumber: 0
        });
    };

    Round.prototype.nextRound = function(gameData) {
        if ( this.data.roundNumber >= gameData.currentRound )
            return false;

        this.setNewWord()
        // watch the round number?
        this.data.roundNumber = gameData.currentRound;
    }

    Round.prototype.setNewWord = function(word, clues) {
        // set them
    }


    angular.module('Models')
        .service('Round', Round)
        ;
}());