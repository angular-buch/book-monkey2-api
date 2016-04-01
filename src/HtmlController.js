'use strict';

var html =
'<!DOCTYPE html>\n\
<html>\n\
  <head>\n\
    <title>BookMonkey2 API</title>\n\
  </head>\n\
  <body>\n\
    <h1>BookMonkey2 API</h1>\n\
    <ul>\n\
      <li><a href="/api/v1/books">GET /api/v1/books</a></li>\n\
      </ul>\n\
    <hr>\n\
    swagger spec doc: <a href="/swagger/resources.json">/swagger/resources.json</a>\n\
  </body>\n\
</html>';

exports.getRoot = function(req, res, next){
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(html),
    'Content-Type': 'text/html'
  });
  res.write(html);
  res.end();
  res.send();
};
