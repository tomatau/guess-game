angular.module('GuessGame')
    .directive('clue', function (GG_DIR) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: GG_DIR + "/drctv/clue/tmpl.html",
            scope: true,
            controllerAs: 'clue',
            link: function(scope){
            },
            controller: function( $scope, Round, $interval){
                console.log('clue', Round.data)
                $scope.round = Round.data;

                $scope.$watch(
                    function () { return Round.data.roundNumber },
                    function (oldVal, newVal) {
                        var interval = $interval(function(){
                            if (Round.data.countdown == 0) {
                                // broadcast the round over
                                $interval.cancel(interval);
                            } else {
                                Round.data.countdown--;
                            }
                        }, 1000)
                    }
                )
            }
        }
    })
;