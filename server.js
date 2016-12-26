"use strict";
var restify_1 = require('restify');
var book_store_controller_1 = require('./src/book-store-controller');
var book_store_1 = require('./src/book-store');
var server_controller_1 = require('./src/server-controller');
var port = 3000;
var bsController = new book_store_controller_1.BookStoreController(new book_store_1.BookStore());
var serverController = new server_controller_1.ServerController();
var server = restify_1.createServer({
    formatters: {
        'application/json': function (req, res, body, cb) {
            return cb(null, JSON.stringify(body, null, '  '));
        }
    }
});
server.use(restify_1.bodyParser());
server.use(restify_1.CORS({}));
server.use(restify_1.queryParser());
server.get('/swagger.json', serverController.getFixedSwaggerJson.bind(serverController));
// serve public folder
server.get(/^(?!\/(book|info)).*/, restify_1.serveStatic({
    directory: __dirname + '/public/',
    default: 'index.html'
}));
// API routes
server.get('/books', bsController.getAll.bind(bsController));
server.del('/books', bsController.reset.bind(bsController));
server.post('/book', bsController.create.bind(bsController));
server.post('/book/:isbn/rate', bsController.rate.bind(bsController));
server.get('/book/:isbn', bsController.getByISBN.bind(bsController));
server.get('/book/:isbn/check', bsController.checkISBN.bind(bsController));
server.put('/book/:isbn', bsController.update.bind(bsController));
server.del('/book/:isbn', bsController.delete.bind(bsController));
server.get('/info', serverController.info.bind(serverController));
// start server
server.listen(port, function () {
    console.log('BookMonkey2 API server on %s', server.url);
});
//# sourceMappingURL=server.js.map