'use strict';

var restify = require('restify');
var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.CORS({}));

var bsctrl = require('./BookStoreController');


/****************
*** ROUTES
****************/

server.get('/books', bsctrl.getAll);
server.get('/books/:isbn', bsctrl.getByISBN);
server.post('/books/:isbn', bsctrl.create);
server.put('/books/:isbn', bsctrl.update);
server.del('/books/:isbn', bsctrl.delete);





server.listen(3000, function() {
  console.log('Server running at %s', server.url);
});
