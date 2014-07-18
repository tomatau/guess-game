;(function(){
    'use strict';
    /**
     * The Current User
     */
    function User(){
        this.data = {
            // id: Math.floor(Math.random() * 1000),
            name: 'Guest'
        };
    }

    User.prototype.setUser = function(userData) {
        if ( ! this.validData(userData) ) 
            throw new Error('Invalid user data supplied');
        // if we have a user already, ask confirmation
        this.data = userData;
        console.log('setting user', this.data)
    };

    User.prototype.validData = function(userData) {
        // require id, email, name, picture, etc
        if (userData.id == null) return false;
        return true;
    };

    User.prototype.hasId = function() {
        return (this.data.id != null);
    };

    angular.module('Models')
        .service('User', User)
        ;
}());