import { createServer, bodyParser, CORS, queryParser, serveStatic } from 'restify';
import { CronJob } from 'cron';

import { BookStoreController } from './src/book-store-controller';
import { BookStore } from './src/book-store';
import { ServerController, saveStringify } from './src/server-controller';
import { RedirectController } from './src/redirect-controller';

let port = 3000;
let bsController = new BookStoreController(new BookStore());
let serverController = new ServerController();
let redirectController = new RedirectController();

var server = createServer({
  formatters: {
    'application/json': function (req, res, body, cb) {
      return cb(null, saveStringify(body));
    }
  }
});
server.use(bodyParser());
server.use(CORS({}));
server.use(queryParser());


server.get('/swagger.json', serverController.getFixedSwaggerJson.bind(serverController));

// serve redirects
server.get(/^\/(a\/|avatar\/)/, redirectController.avatarRedirect.bind(redirectController));
server.get(/^\/(app|bm|it|ngh|start|two|cover|quotes|b\/|x\/)/, redirectController.redirect.bind(redirectController));

// serve public folder
server.get(/^(?!\/(book|info)).*/, serveStatic({
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
server.listen(port, function () {
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
new CronJob('0 1 * * *', () => {
  console.log('Starting cleanup...');
  bsController.reset(null, null, null);
},
  null, // This function is executed when the job stops
  true, // If left at default you will need to call job.start() in order to start the job
  'Europe/Berlin' // Time zone of this job
);
