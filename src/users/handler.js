"use strict";
var service_1 = require('./service');
var service = new service_1.UserService();
var Decorator = (function () {
    function Decorator(user) {
        this.id = user.id;
        this.username = user.username;
    }
    return Decorator;
}());
var UserHandler = (function () {
    function UserHandler() {
    }
    UserHandler.prototype.get = function (req, res) {
        service.find(req.params.id)
            .then(function (user) {
            if (user === null) {
                res.send(404, "Not found");
                return;
            }
            res.send(200, { user: new Decorator(user) });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    return UserHandler;
}());
exports.UserHandler = UserHandler;
//# sourceMappingURL=handler.js.map