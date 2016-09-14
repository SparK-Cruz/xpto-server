"use strict";
var Sequelize = require('sequelize');
var instance = null;
function get() {
    if (instance == null) {
        //TODO tirar config da base e senha daqui
        //     jogar dentro de env vars e passar por parametro no makefile
        instance = new Sequelize('solyos_xpto', 'root', '', {
            host: 'localhost',
            dialect: 'mysql'
        });
    }
    return instance;
}
exports.get = get;
//# sourceMappingURL=connection.js.map