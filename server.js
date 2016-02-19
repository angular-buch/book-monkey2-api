'use strict';

var restify = require('restify');
var server = restify.createServer();

var bsctrl = require('./BookStoreController');


/****************
*** ROUTES
****************/

server.get('/books', bsctrl.getAll);
//server.get('/books/:isbn', bsctrl.getByISBN);
//server.post('/books/:isbn', bsctrl.create);
//server.put('/books/:isbn', bsctrl.update);
//server.delete('/books/:isbn', bsctrl.delete);



server.listen(3000, function() {
  console.log('%s listening at %s', server.name, server.url);
});
