'use strict';
var pjson = require('../package.json');
exports.info = function (req, res, next) {
    var info = {
        version: pjson.version,
        time: process.uptime()
    };
    res.send(info, { 'Content-Type': 'application/json; charset=utf-8' });
    next();
};
//# sourceMappingURL=ServerController.js.map