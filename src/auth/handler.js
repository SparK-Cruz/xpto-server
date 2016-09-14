"use strict";
var service_1 = require('./service');
var service = new service_1.AuthService();
var AuthHandler = (function () {
    function AuthHandler() {
    }
    AuthHandler.prototype.create = function (req, res) {
        service.create(req.body.username, req.body.password)
            .then(function (auth) {
            res.send(201, { auth: auth });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    AuthHandler.prototype.noop = function (req, res) {
        service.touch(req.token)
            .then(function (update) {
            res.send(200, { noop: update });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    AuthHandler.prototype.destroy = function (req, res) {
        service.destroy(req.token)
            .then(function (auth) {
            res.send(200, { auth: auth });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    return AuthHandler;
}());
exports.AuthHandler = AuthHandler;
//# sourceMappingURL=handler.js.map