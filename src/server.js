"use strict";
var handler_1 = require('./auth/handler');
var handler_2 = require('./customers/handler');
var handler_3 = require('./users/handler');
var handlers_1 = require('./handlers');
var Server = (function () {
    function Server(server) {
        this._auth = null;
        this._customer = null;
        this._user = null;
        this.srv = server;
    }
    Server.prototype.bindAuth = function (prefix) {
        if (this._auth !== null)
            return;
        var auth = this._auth = new handler_1.AuthHandler();
        //bindings
        this.srv.post(prefix, handlers_1.normal(auth.create));
        this.srv.put(prefix, handlers_1.restrict(auth.noop));
        this.srv.del(prefix, handlers_1.restrict(auth.destroy));
    };
    Server.prototype.bindUser = function (prefix) {
        if (this._user !== null)
            return;
        var user = this._user = new handler_3.UserHandler();
        this.srv.get(prefix + '/:id', handlers_1.restrict(user.get));
    };
    Server.prototype.bindCustomer = function (prefix) {
        if (this._customer !== null)
            return;
        var customer = this._customer = new handler_2.CustomerHandler();
        //bindings
        this.srv.post(prefix + '/search', handlers_1.restrict(customer.search));
        this.srv.get(prefix, handlers_1.restrict(customer.list));
        this.srv.post(prefix, handlers_1.restrict(customer.create));
        this.srv.get(prefix + '/:id', handlers_1.restrict(customer.get));
        this.srv.put(prefix + '/:id', handlers_1.restrict(customer.update));
        this.srv.del(prefix + '/:id', handlers_1.restrict(customer.destroy));
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map