'use strict';

var bsctrl = require('./src/BookStoreController');
var htmlctrl = require('./src/HtmlController');
var restify = require('restify');
var RestifyRouter = require('restify-routing');
var restifySwagger = require('node-restify-swagger'); // depends on node-restify-validation
var restifyValidation = require('node-restify-validation');

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.CORS({}));
server.use(restify.queryParser());
server.use(restifyValidation.validationPlugin({
    errorsAsArray: false,
}));

restifySwagger.configure(server, {
    description: 'Swaggered BookMonkey2 API',
    title: 'BookMonkey2 API',
    allowMethodInModelNames: true
});

var rootRouter = new RestifyRouter();
var api = new RestifyRouter();


/****************
*** ROUTES
****************/

server.get('/', htmlctrl.getRoot);
api.get('/books', bsctrl.getAll);
api.get('/books/:isbn', bsctrl.getByISBN);
api.post('/books/:isbn', bsctrl.create);
api.put('/books/:isbn', bsctrl.update);
api.del('/books/:isbn', bsctrl.delete);

rootRouter.use('/api/v1', api);
rootRouter.applyRoutes(server);

restifySwagger.loadRestifyRoutes();

server.listen(3000, function() {
  console.log('Server running at %s', server.url);
});
