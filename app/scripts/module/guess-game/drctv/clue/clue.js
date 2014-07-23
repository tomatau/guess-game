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
            controller: function( $scope, Round ){
                console.log('clue', Round.data)
                this.data = Round.data;
            }
        }
    })
;