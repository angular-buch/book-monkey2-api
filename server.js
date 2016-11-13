'use strict';

var port = 3000;

var bookStoreController = require('./src/BookStoreController');
var serverController = require('./src/ServerController');
var restify = require('restify');


var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.CORS({}));
server.use(restify.queryParser());


// serve public folder
server.get(/^(?!\/(book|info)).*/, restify.serveStatic({
    directory: __dirname + '/public/',
    default: 'index.html'
}));


// API routes
server.get('/books', bookStoreController.getAll);
server.del('/books', bookStoreController.reset);
server.post('/book', bookStoreController.create);
server.post('/book/:isbn/rate', bookStoreController.rate);
server.get('/book/:isbn', bookStoreController.getByISBN);
server.get('/book/:isbn/check', bookStoreController.checkISBN);
server.put('/book/:isbn', bookStoreController.update);
server.del('/book/:isbn', bookStoreController.delete);
server.get('/info', serverController.info);

// reset DB on every start
bookStoreController.getDbservice().reset();

// start server
server.listen(port, function () {
    console.log('BookMonkey2 API server on %s', server.url);
});

module.exports = server;
