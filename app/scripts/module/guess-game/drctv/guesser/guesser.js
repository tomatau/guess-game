angular.module('GuessGame')
    .constant('GUESSER_KEY', 'guesser')
    .factory('guesserRef', function(GameRef, GUESSER_KEY){
        return GameRef.child(GUESSER_KEY);
    })
    .directive('guesser', function (
        User, 
        Round, 
        GG_DIR, 
        guesserRef,
        $firebase
    ) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: GG_DIR + "/drctv/guesser/tmpl.html",
            scope: true,
            controllerAs: 'guesser',
            link: function(scope, elem, attr){
                scope.userData = User.get(); // should make a getData function
                scope.guesss = $firebase(
                    guesserRef.child('guesss').limit(5) // only last 12 messages, lol
                );
            },
            controller: function($scope){
                $scope.send = { guess: '' };
                var validGuess = function(guess){
                    if ( typeof guess === "string" )
                        return true;
                }
                $scope.postGuess = function(){
                    if (validGuess($scope.send.guess))
                        $scope.guesss.$add({
                            guess: $scope.send.guess,
                            userName: $scope.userData.name,
                            userId: $scope.userData.id,
                            round: Round.get('roundNumber'),
                            score: Round.getScore($scope.send.guess)
                        });
                    $scope.send.guess = "";
                }
            }
        }
    })