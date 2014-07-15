;(function(){
    'use strict';

    function User(){
        this.data = {
            name: 'Guest'
        };
    }

    User.prototype.setUser = function(userData) {
        if ( ! this.validData(userData) ) 
            throw new Error('Invalid user data supplied');
        // if we have a user already, ask confirmation
        this.data = userData;
    };

    User.prototype.validData = function(userData) {
        // require id, email, name, picture, etc
        if (userData.id == null) return false;
        return true;
    };

    angular.module('Models')
        .service('User', User)
        ;
}());