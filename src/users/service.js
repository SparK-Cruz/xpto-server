"use strict";
var sha1 = require('sha1');
var user_1 = require('./user');
var UserService = (function () {
    function UserService() {
    }
    UserService.prototype.authenticate = function (username, password) {
        var self = this;
        return this.findByUsername(username)
            .then(function (user) {
            if (user === null || user.password !== self.encryptPassword(username, password))
                throw { message: 'Invalid user and/or password!' };
            return user;
        });
    };
    UserService.prototype.find = function (id) {
        return user_1.User.Dao.findOne({
            where: {
                id: id
            }
        });
    };
    ;
    UserService.prototype.findByUsername = function (username) {
        return user_1.User.Dao.findOne({
            where: {
                username: username
            }
        });
    };
    ;
    UserService.prototype.encryptPassword = function (username, password) {
        return sha1('add XPTO salt for ' + username + ' to enter their ' + password + ' safe');
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=service.js.map