;(function(){
    'use strict';
    /**
     * The Current User
     */
    function User(){
        this.data = {};
        this.setDefault();
    }

    User.prototype.setDefault = function() {
        // keep reference but clear all properties
        for (var member in this.data) delete this.data[member];
        angular.extend(this.data, {
            // id: Math.floor(Math.random() * 1000),
            name: 'Guest'
        });
    };

    User.prototype.setUser = function(userData) {
        if ( ! this.validData(userData) ) 
            throw new Error('Invalid user data supplied');
        // if we have a user already, ask confirmation
        angular.extend(this.data, userData);
    };

    User.prototype.validData = function(userData) {
        // require id, email, name, picture, etc
        if (userData.id == null) return false;
        return true;
    };

    User.prototype.hasId = function() { // conflicting as we expose data contents anyway
        return (this.data.id != null);
    };
    
    // should provide a getter

    User.prototype.get = function(prop) {
        if (prop == null) return this.data;
        return this.data[prop];
    };

    angular.module('Models')
        .service('User', User)
        ;
}());