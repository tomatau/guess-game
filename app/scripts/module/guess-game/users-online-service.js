angular.module('GuessGame')
    .factory('usersOnlineRef', function(GameRef){
        return GameRef.child('usersOnline');
    })
    // not happy with this service
    .factory('usersOnline', function (
        usersOnlineRef, 
        UserList, 
        User, 
        $rootScope, 
        $window
    ) {
        'use strict';
        // MAKE A OBJECT.CREATE OF THE USERLIST FOR USERSONLINE LIST
        //  then never modify the basic user list

        // OR make an angular.copy of the object but remember to resetOnline

        var usersOnlineQuery = usersOnlineRef.endAt().limit(12);
        // should provide pagination of this

        usersOnlineQuery.on('child_added', function (snapshot) {
            console.log('added from ref', snapshot.val())
            UserList.addUser(snapshot.val());
            if ( ! $rootScope.$$phase ) {
                $rootScope.$apply();
            }
        });

        usersOnlineQuery.on('child_removed', function (snapshot) {
            console.log('REMOVE USER', snapshot.val())
            UserList.removeUser(snapshot.val());
            if ( ! $rootScope.$$phase ) {
                $rootScope.$apply();
            }
        });

        // watch the state of current user,
        $rootScope.$watch( 
            function(){ return User.data },
            function (newValue, oldVal) {
                // login
                if ( User.hasId() && oldVal != newValue )
                    usersOnlineRef.child(newValue.id).set(newValue);

                // logout
                if ( ! User.hasId() && oldVal.id )
                    usersOnlineRef.child(oldVal.id).remove();
            },
            true // watching the data object's value
        );

        // remove the user when then navigate away or close the page
        angular.element($window).on('beforeunload', function(){
            if ( User.hasId() )
                usersOnlineRef.child(User.data.id).remove();
        });

        // move this stuff into a directive:
        //  we don't need to use this manually, it's just responding to firebase
        //  it only needs to manipulate the UserList Model
        //  
        //  but, don't move it into a directive if we provide pagination.
        //  we might want lists each on different pagination (offset, length)
        //  so will need multiple instances of user-list/user-online-list

        // this current returns the query but this will be inconsistent
        return usersOnlineQuery;
    })
;