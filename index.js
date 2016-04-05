module.exports = {
  
  name: 'book-monkey2-api',
  
  serverMiddleware: function (config) {
  
    // in future we might want to integrate our middleware into existing express-server
    // example: https://github.com/rwjblue/ember-cli-content-security-policy/blob/v0.3.0/index.js#L25    
    var server = require('./server.js');
  }
};