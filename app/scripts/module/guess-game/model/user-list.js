;(function(){
    'use strict';
    // we want methods such as find, add, remove
    //  so use a model instead of firebaseChild directly

    function UserList(){
        this.list = [];
    }

    UserList.prototype.get = function(prop) {
        return this.list;
    }

    UserList.prototype.addUser = function(userData) {
        this.list.push(userData);
    };

    UserList.prototype.removeUser = function(userId) {
        var index = v.indexOf( this.list, this.getUser(userId) );
        // this could piss up the history list
        this.list.splice(index, 1);
    };

    UserList.prototype.getUser = function(userId) {
        return v.find(this.list, function(user){
            return user.id == userId;
        })
    };

    UserList.prototype.resetList = function() {
        this.list.length = 0;
    };

    angular.module('Models')
        // service is a constuctor
        // use factory to return constrctor if need multiple instances
        .service('UserList', UserList)
        ;
}());