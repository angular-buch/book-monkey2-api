'use strict';

var bookStoreController = require('./src/BookStoreController');
var restify = require('restify');

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.CORS({}));
server.use(restify.queryParser());

server.get(/^(?!\/books).*$/, restify.serveStatic({
  directory: './public/',
  default: 'index.html'
}));

server.get('/books', bookStoreController.getAll);
server.get('/books/:isbn', bookStoreController.getByISBN);
server.post('/books/:isbn', bookStoreController.create);
server.put('/books/:isbn', bookStoreController.update);
server.del('/books/:isbn', bookStoreController.delete);

server.listen(3000, function() {
  console.log('Server running at %s', server.url);
});
