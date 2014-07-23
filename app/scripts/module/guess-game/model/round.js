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
            roundNumber: 0
        });
    };

    Round.prototype.nextRound = function(gameData, word) {
        if ( this.data.roundNumber >= gameData.currentRound )
            return false;

        this.word = word;
        // watch the round number?
        this.data.roundNumber = gameData.currentRound;
    }


    angular.module('Models')
        .service('Round', Round)
        ;
}());