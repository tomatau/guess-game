angular.module('GuessGame')
    .directive('userList', function (UserList, GG_DIR) {
        'use strict';
        return {
            restrict: 'E',
            templateUrl: GG_DIR + "/drctv/user-list/tmpl.html",
            scope: true,
            // controllerAs: 'chat',
            link: function(scope){
                // split into multiple lists showing number online etc
                scope.userList = UserList.online;
            }
        }
    })
;