"use strict";
var Sequelize = require('sequelize');
var db = require('../connection');
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var User;
(function (User) {
    User.Dao = db.get().define('users', {
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING
    });
})(User = exports.User || (exports.User = {}));
//# sourceMappingURL=user.js.map