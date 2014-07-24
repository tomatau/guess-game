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
        Scores,
        GG_DIR, 
        guesserRef,
        $firebase
    ) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: GG_DIR + '/drctv/guesser/tmpl.html',
            scope: true,
            controllerAs: 'guesser',
            link: function(scope, elem, attr){
                scope.userData = User.get(); // should make a getData function
                scope.guesss = $firebase(
                    guesserRef.child('guesss').limit(100) // only last 12 messages, lol
                );
            },
            controller: function($scope){
                $scope.send = { guess: '' };
                var validGuess = function(guess){
                    if ( typeof guess === 'string' )
                        return true;
                };
                $scope.postGuess = function(){
                    // SWAP THIS FOR CURRENTGAME.MAKEGUESS(guess)
                    var scoreGuess = Scores.toScore(
                        $scope.userData,
                        {
                            guess: $scope.send.guess,
                            round: Round.get('roundNumber'),
                            score: Round.getScore($scope.send.guess)
                        }
                    );
                    if (validGuess($scope.send.guess))
                        $scope.guesss.$add(
                            scoreGuess
                        );
                    $scope.send.guess = '';
                }
            }
        };
    });