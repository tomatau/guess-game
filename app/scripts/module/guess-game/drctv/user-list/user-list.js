angular.module('GuessGame')
    .directive('userList', function (UserList, GG_DIR) {
        return {
            restrict: 'E',
            templateUrl: GG_DIR + "/drctv/user-list/tmpl.html",
            scope: true,
            link: function(scope){
                scope.userList = UserList.online;
            }
        }
    })
;