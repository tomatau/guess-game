angular.module('Auth')
    .directive('googleLogin', 
        function (AUTH_DIR, GameRef, User, $firebaseSimpleLogin, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: AUTH_DIR + "/drctv/login/google-tmpl.html",
            scope: true,
            // require another directive and inject ctrl ?^
            link: function(scope, elem, attr){
                scope.auth = $firebaseSimpleLogin(GameRef);
                $rootScope.$on('$firebaseSimpleLogin:login', function (event, user) {
                    if (user != null) {
                        User.setUser(user.thirdPartyUserData);
                        scope.user = user;
                    }
                });
                $rootScope.$on('$firebaseSimpleLogin:logout', function (event, user) {
                    User.setDefault();
                    scope.user = user;
                });
            },
            controller: function($scope, $element, $attrs, $transclude){
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