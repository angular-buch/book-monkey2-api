"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify_1 = require("restify");
var cron_1 = require("cron");
var book_store_controller_1 = require("./src/book-store-controller");
var book_store_1 = require("./src/book-store");
var server_controller_1 = require("./src/server-controller");
var redirect_controller_1 = require("./src/redirect-controller");
var PORT = process.env.PORT || 4000;
var bsController = new book_store_controller_1.BookStoreController(new book_store_1.BookStore());
var serverController = new server_controller_1.ServerController();
var redirectController = new redirect_controller_1.RedirectController();
var server = restify_1.createServer({
    formatters: {
        'application/json': function (req, res, body, cb) {
            return cb(null, server_controller_1.saveStringify(body));
        }
    }
});
server.use(restify_1.bodyParser());
server.use(restify_1.CORS({}));
server.use(restify_1.queryParser());
server.get('/swagger.json', serverController.getFixedSwaggerJson.bind(serverController));
// serve redirects
server.get(/^\/(a\/|avatar\/)/, redirectController.avatarRedirect.bind(redirectController));
server.get(/^\/(app|bm|it|ngh|start|two|cover|quotes|b\/|x\/)/, redirectController.redirect.bind(redirectController));
// serve public folder
server.get(/^(?!\/(book|info)).*/, restify_1.serveStatic({
    directory: __dirname + '/public/',
    default: 'index.html'
}));
// API routes
server.get('/books', bsController.getAll.bind(bsController));
server.get('/books/search/:search', bsController.getAllBySearch.bind(bsController));
server.del('/books', bsController.reset.bind(bsController));
server.post('/book', bsController.create.bind(bsController));
server.post('/book/:isbn/rate', bsController.rate.bind(bsController));
server.get('/book/:isbn', bsController.getByISBN.bind(bsController));
server.get('/book/:isbn/check', bsController.checkISBN.bind(bsController));
server.put('/book/:isbn', bsController.update.bind(bsController));
server.del('/book/:isbn', bsController.delete.bind(bsController));
server.get('/info', serverController.info.bind(serverController));
// start server
server.listen(PORT, function () {
    console.log('BookMonkey2 API server on %s', server.url);
});
/*
  crontab every day at 1am => 0 1 * * *

    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    |
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)

*/
new cron_1.CronJob('0 1 * * *', function () {
    console.log('Starting cleanup...');
    bsController.reset(null, null, null);
}, null, // This function is executed when the job stops
true, // If left at default you will need to call job.start() in order to start the job
'Europe/Berlin' // Time zone of this job
);
//# sourceMappingURL=server.js.map