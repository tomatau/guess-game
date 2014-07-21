;(function(){
    'use strict';
    /**
     * The Current Game
     */
    function Game(){
        this.data = {};
        this.setDefault();
    }

    Game.prototype.setDefault = function() {
        // keep reference but clear all properties
        for (var member in this.data) delete this.data[member];
        angular.extend(this.data, {
            gameId: 0,
            status: 'waiting-room',
            startedTime: Date.now(),
            finishedTime: null
        });
    };

    angular.module('Models')
        .service('Game', Game)
        ;
}());