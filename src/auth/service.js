"use strict";
var auth_1 = require('./auth');
var service_1 = require('../users/service');
var config = require('../config');
var authStorage = {};
var userService = new service_1.UserService();
var AuthService = (function () {
    function AuthService() {
    }
    AuthService.prototype.create = function (username, password) {
        var self = this;
        return userService.authenticate(username, password)
            .then(function (user) {
            for (var key in authStorage) {
                var current = authStorage[key];
                if (current.updatedAt < self.getExpiredTime()) {
                    delete authStorage[current.token];
                    continue;
                }
                if (current.username == username) {
                    delete authStorage[current.token];
                }
            }
            var auth = new auth_1.Auth();
            auth.userId = user.id;
            auth.username = user.username;
            authStorage[auth.token] = auth;
            return auth;
        });
    };
    AuthService.prototype.find = function (token) {
        var self = this;
        return Promise.resolve().then(function () {
            var sessionModel = authStorage[token];
            if (sessionModel == null)
                throw { message: "Invalid auth token!" };
            if (sessionModel.updatedAt < self.getExpiredTime()) {
                delete authStorage[token];
                throw { message: "Invalid auth token!" };
            }
            return sessionModel;
        });
    };
    ;
    AuthService.prototype.touch = function (token) {
        var self = this;
        return Promise.resolve().then(function () {
            return authStorage[token].updatedAt = new Date();
        });
    };
    ;
    AuthService.prototype.destroy = function (token) {
        var session = authStorage[token];
        delete authStorage[token];
        return Promise.resolve(session);
    };
    ;
    //private
    AuthService.prototype.getExpiredTime = function () {
        var expiredTimeAgo = new Date();
        expiredTimeAgo.setMinutes(expiredTimeAgo.getMinutes()
            - config.expireSessionMinutes);
        return expiredTimeAgo;
    };
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=service.js.map