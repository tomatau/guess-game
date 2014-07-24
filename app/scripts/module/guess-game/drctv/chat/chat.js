angular.module('GuessGame')
    .constant('CHAT_KEY', 'chatRoom')
    .factory('chatRoomRef', function(GameRef, CHAT_KEY){
        return GameRef.child(CHAT_KEY);
    })
    .directive('chat', function (
        User, 
        GG_DIR, 
        chatRoomRef,
        $firebase
    ) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: GG_DIR + "/drctv/chat/tmpl.html",
            scope: true,
            controllerAs: 'chat',
            // require the game runner service?, can use controller
            link: function(scope, elem, attr){
                // using a string literal from a method makes the watch necessary
                // scope.$watch( function(){ return User.get('name'); },
                //     function(newValue){ scope.userName = newValue; } )
                // watching an object, shares state automagically
                scope.userData = User.get(); // should make a getData function
                scope.messages = $firebase(
                    chatRoomRef.child('messages').limit(12) // only last 12 messages, lol
                );
            },
            controller: function($scope){
                $scope.send = { message: '' };
                var validMessage = function(message){
                    if ( typeof message === "string" )
                        return true;
                }
                $scope.postMessage = function(){
                    if (validMessage($scope.send.message))
                        $scope.messages.$add({
                            message: $scope.send.message,
                            userName: $scope.userData.name,
                            datetime: Date.now()
                        });
                    $scope.send.message = "";
                }
                $scope.date = function(dt){ return new Date(dt) }
            }
        }
    })