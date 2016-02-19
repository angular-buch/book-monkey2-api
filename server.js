'use strict';

var bsctrl = require('./BookStoreController');
var restify = require('restify');
var RestifyRouter = require('restify-routing')
var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.CORS({}));


var rootRouter = new RestifyRouter();
var api = new RestifyRouter();


/****************
*** ROUTES
****************/

api.get('/books', bsctrl.getAll);
api.get('/books/:isbn', bsctrl.getByISBN);
api.post('/books/:isbn', bsctrl.create);
api.put('/books/:isbn', bsctrl.update);
api.del('/books/:isbn', bsctrl.delete);




rootRouter.use('/api/v1', api);
rootRouter.applyRoutes(server);

server.listen(3000, function() {
  console.log('Server running at %s', server.url);
});
