angular.module('GuessGame')
    .filter('range', function(){
        return function (input, value) {
            value = Number(value);
            for (var i = 0; i < value; i++)
                input.push(i);
            return input;
        }
    })
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
            controller: function( $scope ){ }
        }
    })
;