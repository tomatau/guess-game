angular.module('GuessGame')
    .directive('clue', function (GG_DIR, Round) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: GG_DIR + "/drctv/clue/tmpl.html",
            scope: true,
            controllerAs: 'clue',
            link: function(scope){
                scope.round = Round.get();
            },
            controller: function( $scope ){
            }
        }
    })
;