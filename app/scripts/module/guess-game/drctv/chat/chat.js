angular.module('GuessGame')
    .directive('chat', function (User, GG_DIR) {
        return {
            restrict: 'E',
            templateUrl: GG_DIR + "/drctv/chat/tmpl.html",
            scope: true,
            // require the game runner service?, can use controller
            link: function(scope, elem, attr){
                scope.$watch(function(){
                        return User.getName();
                    },
                    function(newValue){
                        scope.userName = newValue;
                    }
                )
            },
            controller: function($scope){
                $scope.postMessage = function(){
                    // trim it, send it to a service
                }
            }
        }
    })
;