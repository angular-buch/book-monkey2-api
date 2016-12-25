var pjson = require('../package.json');

export class ServerController {

  info(req, res, next) {

    var info = {
      version: pjson.version,
      time: process.uptime()
    };

    res.send(info, { 'Content-Type': 'application/json; charset=utf-8' });
    next();
  }
}
