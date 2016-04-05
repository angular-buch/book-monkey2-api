var server = require('./server.js');

module.exports = {
  
  name: 'book-monkey2-api',
  
  serverMiddleware: function () {
    console.log("hello-world!");
  }
};