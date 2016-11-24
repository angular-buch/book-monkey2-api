'use strict';

module.exports = {
  name: 'book-monkey2-api',

  includedCommands: function () {
    return {
      'monkey': {

        name: 'monkey',
        description: 'Starts a webserver with the BookMonkey2 API',
        works: 'everywhere',

        run: function (commandOptions) {

          // same as in serve-webpack.ts, it never resolves so that it runs endlessly
          return new Promise((resolve, reject) => {

            // this can throw exceptions, eg. when port is blocked
            var server = require('./server.js');
          });
        }
      }
    };
  }
};
