"use strict";
var service_1 = require('./auth/service');
var authService = new service_1.AuthService();
function normal(action) {
    return function (req, res, next) {
        action(req, res, next);
    };
}
exports.normal = normal;
function restrict(action) {
    return function (req, res, next) {
        var authHeader = req.header('Authorization');
        if (typeof authHeader === 'undefined') {
            res.send(401, new Error('Authorization token not provided'));
            return next();
        }
        if (authHeader.indexOf('Token ') < 0) {
            res.send(401, new Error('Login first'));
            return next();
        }
        var token = authHeader.replace('Token ', '');
        authService.find(token)
            .then(function (auth) {
            req.token = token;
            req.userId = auth.userId;
            return next;
        })
            .then(function (next) {
            authService.touch(token);
            action(req, res);
            return next();
        })
            .catch(function (fail) {
            res.send(401, fail);
            return next();
        });
    };
}
exports.restrict = restrict;
//# sourceMappingURL=handlers.js.map