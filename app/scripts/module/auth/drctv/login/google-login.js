angular.module('Auth')
    .directive('googleLogin', 
        function (AUTH_DIR, GameRef, User, $firebaseSimpleLogin, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: AUTH_DIR + "/drctv/login/google-tmpl.html",
            scope: true,
            // require another directive and inject ctrl ?^
            link: function(scope, elem, attr){
                // should use $firebaseSimpleLogin.$login.then
                scope.auth = $firebaseSimpleLogin(GameRef);

                $rootScope.$on('$firebaseSimpleLogin:login', function (event, user) {
                    console.log('Logged in:', User)
                    if (user != null) {
                        // $rootScope.$apply(function () {
                            // console.log($rootScope.$$phase)
                        User.setUser(user.thirdPartyUserData);
                        scope.user = user;
                        // })
                    }
                });

                // watch happens after rootScope event
                // scope.$watch('auth.user', function (currentUser, oldVal) {
                //     if (currentUser != null) {
                //         User.setUser(currentUser.thirdPartyUserData);
                //         scope.user = currentUser;
                //         console.log('Logged in:', User)
                //     }
                // });
            },
            controller: function($scope, $element, $attrs, $transclude){
                $scope.login = {
                    submit: function () {
                        console.log($scope.auth)
                        $scope.auth.$login('google', {
                            rememberMe: true,
                            scope: 'https://www.googleapis.com/auth/plus.login'
                        })
                    },
                    logout: function(){
                        $scope.auth.$logout();
                    }
                }
            }
        }
    })