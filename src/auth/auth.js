"use strict";
var Auth = (function () {
    function Auth() {
        this.updatedAt = new Date();
        this.token = this.generateNewToken();
    }
    Auth.prototype.generateNewToken = function () {
        var chars = [[48, 57], [65, 90], [97, 122]];
        var length = 16;
        var token = '';
        for (var i = 0; i < length; i++) {
            var addr = Math.floor(Math.random() * 3);
            var type = chars[addr];
            token += String.fromCharCode(Math.floor(Math.random() * (type[1] + 0.9 - type[0])) + type[0]);
        }
        return token;
    };
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map