angular.module('Auth')
    .directive('emailLogin', function (AUTH_DIR, GameRef) {
        'use strict';
        var auth = new FirebaseSimpleLogin(GameRef, function(error, user) {});
        // console.log(GameRef, auth)

        return {
            restrict: 'E',
            templateUrl: AUTH_DIR + "/drctv/login/email-tmpl.html",
            scope: true,
            // require another directive and inject ctrl ?^
            link: function(scope, elem, attr){

            },
            controller: function($scope, $element, $attrs, $transclude){
                $scope.login = {
                    submit: function () {
                        console.log($scope.email)
                        console.log($scope.password)
                        // auth.login('google')
                    }
                }
            }
        }
    })