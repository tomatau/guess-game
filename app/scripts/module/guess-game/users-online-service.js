angular.module('GuessGame')
    .constant('USERS_KEY', 'usersOnline')
    .factory('usersOnline', function (firebaseGuessGame, USERS_KEY, UserList, User) {
        var usersOnline = firebaseGuessGame.$child(USERS_KEY);
        // 
        // somehow watch the state of current user,
        //  adding it to usersOnline
        //  maintain list of current users
        return {

        }
    });
;