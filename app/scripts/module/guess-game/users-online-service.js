angular.module('GuessGame')
    .factory('usersOnlineRef', function(GameRef){
        return GameRef.child('usersOnline');
    })
    .factory('usersOnline', function (usersOnlineRef, UserList, User, $rootScope, $window) {
        var usersOnlineQuery = usersOnlineRef.endAt().limit(50);

        usersOnlineQuery.on('child_added', function (snapshot) {
            UserList.addUser(snapshot.val());
        })

        usersOnlineQuery.on('child_removed', function (snapshot) {
            UserList.removeUser(snapshot.val());
        })
        // 
        // watch the state of current user,
        $rootScope.$watch( function(){ return User.data },
            function (newValue, oldVal) {
                // console.log('user data change:', arguments)
                if ( User.hasId() )
                    usersOnlineRef.child(User.data.id).set(User.data)
            }
        )

        // remove the user when then navigate away or close the page
        angular.element($window).on('beforeunload', function(){
            if ( User.hasId() )
                usersOnlineRef.child(User.data.id).remove();
        })
        // move this stuff into a directive:
        // 
        //  we don't need to use this manually, it's just responding to firebase
        //  it only needs to manipulate the UserList Model
        return usersOnlineQuery;
    });
;