"use strict";
var service_1 = require('./service');
var service = new service_1.CustomerService();
var CustomerHandler = (function () {
    function CustomerHandler() {
    }
    CustomerHandler.prototype.create = function (req, res) {
        service.create(req.body)
            .then(function (created) {
            res.send(201, { customer: created });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    CustomerHandler.prototype.search = function (req, res) {
        service.search(req.body)
            .then(function (customers) {
            res.send(200, { customers: customers });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    CustomerHandler.prototype.list = function (req, res) {
        service.list()
            .then(function (customers) {
            res.send(200, { customers: customers });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    CustomerHandler.prototype.get = function (req, res) {
        service.find(req.params.id)
            .then(function (customer) {
            if (customer === null) {
                res.send(404, "Not found");
                return;
            }
            res.send(200, { customer: customer });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    CustomerHandler.prototype.update = function (req, res) {
        var model = req.body;
        model.id = req.params.id;
        service.update(model)
            .then(function (updated) {
            res.send(200, { customer: updated });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    CustomerHandler.prototype.destroy = function (req, res) {
        service.destroy(req.params.id)
            .then(function (destroyed) {
            res.send(200, { customer: destroyed });
        })
            .catch(function (fail) {
            console.error(fail);
            res.send(400, fail);
        });
    };
    return CustomerHandler;
}());
exports.CustomerHandler = CustomerHandler;
//# sourceMappingURL=handler.js.map