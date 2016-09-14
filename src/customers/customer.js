"use strict";
var Sequelize = require('sequelize');
var db = require('../connection');
var Customer = (function () {
    function Customer() {
    }
    return Customer;
}());
exports.Customer = Customer;
var Customer;
(function (Customer) {
    Customer.Dao = db.get().define('customers', {
        name: Sequelize.STRING,
        birth: Sequelize.TIME,
        federalId: {
            type: Sequelize.STRING(11),
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        phone: Sequelize.STRING,
        enabled: Sequelize.BOOLEAN
    });
})(Customer = exports.Customer || (exports.Customer = {}));
//# sourceMappingURL=customer.js.map