angular.module('GuessGame')
    .directive('chat', function (User, GG_DIR) {
        return {
            restrict: 'E',
            templateUrl: GG_DIR + "/drctv/chat/tmpl.html",
            scope: true,
            controllerAs: 'chat',
            // require the game runner service?, can use controller
            link: function(scope, elem, attr){
                // using a method makes the watch necessary
                // can just dig into user.data.id
                scope.$watch(
                    function(){ return User.getName(); },
                    function(newValue){ scope.userName = newValue; }
                )
            },
            controller: function($scope){
                $scope.postMessage = function(){
                    // trim it, send it to a service
                    // send the datetime too
                }
            }
        }
    })
;