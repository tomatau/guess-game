angular.module('GuessGame')
    .constant('GUESSER_KEY', 'guesser')
    .factory('guesserRef', function(GameRef, GUESSER_KEY){
        'use strict';
        return GameRef.child(GUESSER_KEY);
    })
    .filter('currentRound', function (Round) {
        'use strict';
        var currentRound = Round.get('roundNumber');
        return function(input){
            var guesss = [];
            input.forEach(function(g){
                if (g.round === currentRound) guesss.push(g);
            });
            return guesss;
        }
    })
    .directive('guesser', function (
        User, 
        Round, 
        GG_DIR, 
        guesserRef,
        $firebase,
        currentGame
    ) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: GG_DIR + '/drctv/guesser/tmpl.html',
            scope: true,
            controllerAs: 'guesser',
            link: function(scope, elem, attr){
                scope.userData = User.get();
                scope.guesss = $firebase(
                    guesserRef.limit(100)
                );
            },
            controller: function($scope){
                $scope.send = { guess: '' };
                $scope.postGuess = function(){
                    currentGame.makeGuess(
                        $scope.send.guess
                    );
                    $scope.send.guess = '';
                }
            }
        };
    });