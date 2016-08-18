'use strict';

// `require.main.require` so that plugin even works when linked with `npm link`
// see https://github.com/npm/npm/issues/5875 / http://stackoverflow.com/a/25800501
//
// hint:
// this asumes a flat node_modules structure with ember-cli on top
// and does not work in NPM 2 until ember-cli is directly in package.json
var Command = require.main.require('ember-cli/lib/models/command');
var Promise = require.main.require('ember-cli/lib/ext/promise');

var cmd = Command.extend({

  name: 'monkey',
  description: 'Starts a webserver with the BookMonkey2 API',
  works: 'everywhere',
  //aliases: ['server', 's'],

  run: function (commandOptions) {

    // same as in serve-webpack.ts, it never resolves so that it runs endlessly
    return new Promise((resolve, reject) => { 

        // this can throw exceptions, eg. when port is blocked
        var server = require('./server.js');
    });
  }
});


module.exports = {
  name: 'book-monkey2-api',

  includedCommands: function () {
    return {
      'monkey': cmd
    };
  }
};
