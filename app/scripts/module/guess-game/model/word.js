;(function(){
    'use strict';
    /**
     * The Current Round
     */
    function Word(){
        this.word = null;
        this.clues = [];
    }

    Word.prototype.setWord = function(word, clues) {
        this.word = word;
        this.clues = clues;
    };


    angular.module('Models')
        .service('Word', Word)
        ;
}());