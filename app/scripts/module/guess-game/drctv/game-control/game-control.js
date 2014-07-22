angular.module('GuessGame')
    .directive('gameControl', function (GG_DIR) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: GG_DIR + "/drctv/game-control/tmpl.html",
            scope: true,
            // controllerAs: 'control',
            link: function(scope){
                // split into multiple lists showing number online etc
            },
            controller: function(
                $scope,
                currentGame,
                Game
            ){
                $scope.game = Game.data;
                
                $scope.startButton = function(){
                    // either events
                    // or directly onto currentGame
                    currentGame.startButton();
                }

                // $scope.resetButton = function(){
                //     currentGame.resetButton();
                // }
            }
        }
    })
;