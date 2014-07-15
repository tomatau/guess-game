angular.module('Auth')
    .directive('googleLogin', function (AUTH_DIR, GameRef, User) {
        return {
            restrict: 'E',
            templateUrl: AUTH_DIR + "/drctv/login/google-tmpl.html",
            scope: true,
            // require another directive and inject ctrl ?^
            link: function(scope, elem, attr){
                scope.auth = new FirebaseSimpleLogin(GameRef, function(error, user) {
                    scope.$apply(function(){
                        // populate the user model
                        User.setUser(user.thirdPartyUserData);
                        console.log(User)
                        scope.user = user;
                    })
                });
            },
            controller: function($scope, $element, $attrs, $transclude){
                $scope.login = {
                    submit: function () {
                        $scope.auth.login('google', {
                            rememberMe: true,
                            scope: 'https://www.googleapis.com/auth/plus.login'
                        })
                    },
                    logout: function(){
                        $scope.auth.logout();
                    }
                }
            }
        }
    })