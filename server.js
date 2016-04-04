'use strict';

var port = 3000;

var bookStoreController = require('./src/BookStoreController');
var restify = require('restify');

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.CORS({}));
server.use(restify.queryParser());


//CORS
server.opts(/\/.*/, function (req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.send(200);
});


// serve public folder
server.get(/^(?!\/book).*/, restify.serveStatic({
  directory: './public/',
  default: 'index.html'
}));


// API routes
server.get('/books', bookStoreController.getAll);
server.post('/book', bookStoreController.create);
server.get('/book/:isbn', bookStoreController.getByISBN);
server.put('/book/:isbn', bookStoreController.update);
server.del('/book/:isbn', bookStoreController.delete);


// start server
server.listen(port, function() {
  console.log('Server running at %s', server.url);
});
