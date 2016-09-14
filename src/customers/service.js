"use strict";
var customer_1 = require('./customer');
var CustomerService = (function () {
    function CustomerService() {
    }
    CustomerService.prototype.create = function (customer) {
        return customer_1.Customer.Dao.create(customer)
            .then(function (result) {
            customer.id = result.id;
            return customer;
        });
        ;
    };
    CustomerService.prototype.search = function (filter) {
        filter.search = '%' + (filter.search || '').trim() + '%';
        filter.birthMin = new Date(filter.birthMin || "0001-01-01");
        filter.birthMax = new Date(filter.birthMax || "9999-12-31");
        filter.birthMax.setUTCHours(23);
        filter.birthMax.setUTCMinutes(59);
        return customer_1.Customer.Dao.findAll({
            where: {
                $or: [
                    { name: { $like: filter.search } },
                    { federalId: { $like: filter.search } },
                    { email: { $like: filter.search } }
                ],
                birth: {
                    $gte: filter.birthMin,
                    $lte: filter.birthMax
                }
            }
        });
    };
    CustomerService.prototype.list = function () {
        return customer_1.Customer.Dao.all();
    };
    CustomerService.prototype.find = function (id) {
        return customer_1.Customer.Dao.findById(id);
    };
    CustomerService.prototype.update = function (customer) {
        return customer_1.Customer.Dao.update(customer, { where: { id: customer.id } })
            .then(function () {
            return customer;
        });
    };
    CustomerService.prototype.destroy = function (id) {
        var self = this;
        return self.find(id)
            .then(function (customer) {
            return customer_1.Customer.Dao.update({ enabled: false }, { where: { id: id }, fields: ['enabled'] })
                .then(function () {
                return customer;
            });
        });
    };
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=service.js.map