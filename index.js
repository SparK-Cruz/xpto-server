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
server.pre(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');
    return next();
});
server.opts('/.*/', function (req, res, next) {
    res.send(204);
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