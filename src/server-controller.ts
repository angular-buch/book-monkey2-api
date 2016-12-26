let pjson = require('../package.json');
let fs = require('fs');

export class ServerController {

  info(req, res, next) {

    var info = {
      version: pjson.version,
      time: process.uptime()
    };

    res.send(info, { 'Content-Type': 'application/json; charset=utf-8' });
    next();
  }

  // swagger UI can only handle one scheme, so we have to fix the swagger.json
  getFixedSwaggerJson(req, res, next) {

    fs.readFile('./public/swagger.json', 'utf8', function (err, file: string) {

      if (err) {
        res.send(500);
        return next();
      }

      if (~req.headers.host.indexOf('localhost:3000')) {
        file = file.replace('"https"', '"http"')
      }

      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(file),
        'Content-Type': 'application/json; charset=utf-8'
      });
      res.write(file);
      res.end();
      next(false);
    });
  }
}
