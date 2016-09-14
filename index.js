"use strict";
var restify = require('restify');
var server_1 = require('./src/server');
var server = restify.createServer({
    name: 'Solyos XPTO Server',
    version: '0.1.0'
});
server.pre(restify.pre.sanitizePath());
server.pre(restify.pre.userAgentConnection());
server.use(restify.bodyParser({ mapParams: false }));
server.use(function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
});
var xptoServer = new server_1.Server(server);
xptoServer.bindUser('/api/users');
xptoServer.bindAuth('/api/auth');
xptoServer.bindCustomer('/api/customers');
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
//# sourceMappingURL=index.js.map