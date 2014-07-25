angular.module('Auth')
    .directive('googleLogin', function (
            AUTH_DIR, 
            GameRef, 
            User, 
            $firebaseSimpleLogin, 
            $rootScope
    ) {
        'use strict';
        // move auth object to here instead
        return {
            restrict: 'E',
            templateUrl: AUTH_DIR + "/drctv/login/google-tmpl.html",
            scope: true,
            // controllerAs: 'login',
            // require another directive and inject ctrl ?^
            link: function(scope, elem, attr){
                scope.auth = $firebaseSimpleLogin(GameRef);
                $rootScope.$on('$firebaseSimpleLogin:login', function (event, user) {
                    if (user != null) {
                        User.setUser(user.thirdPartyUserData);
                        scope.user = User.get();
                    }
                });
                $rootScope.$on('$firebaseSimpleLogin:logout', function (event, user) {
                    User.setDefault();
                });
            },
            controller: function($scope, $element, $attrs, $transclude){
                // why a login object?
                $scope.login = {
                    submit: function () {
                        $scope.auth.$login('google', {
                            rememberMe: true,
                            scope: 'https://www.googleapis.com/auth/plus.login'
                        }); // promise
                    },
                    logout: function(){
                        $scope.auth.$logout(); // promise
                    }
                }
            }
        }
    })