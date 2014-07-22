;(function(){
    'use strict';
    // we want methods such as find, add, remove
    //  so use a model instead of firebaseChild directly

    function UserList(){
        this.online = [];
    }

    UserList.prototype.addUser = function(userData) {
        this.online.push(userData);
        // console.log(this.online)
    };

    UserList.prototype.removeUser = function(userId) {
        var index = v.indexOf( this.online, this.getUser(userId) );
        // this could piss up the history list
        this.online.splice(index, 1);
    };

    UserList.prototype.getUser = function(userId) {
        return v.find(this.online, function(user){
            return user.id == userId;
        })
    };

    UserList.prototype.resetOnline = function() {
        this.online.length = 0;
    };

    angular.module('Models')
        // service is a constuctor
        // use factory to return constrctor if need multiple instances
        .service('UserList', UserList)
        ;
}());