# book-monkey2-api

![Monkey](public/images/monkey-thinking.png)

REST Server Backend for the [BookMonkey2](https://github.com/Angular2Buch/book-monkey2) demo.  
A publicly available server is hosted at [book-monkey2-api.angular2buch.de](http://book-monkey2-api.angular2buch.de/).  
It always serves the latest version (#master).  
The API is fully described via swagger. Explore it [here](http://book-monkey2-api.angular2buch.de/swagger-ui/#/book).

# The book

[![Book](public/images/book-thumbnail.png)](https://angular2buch.de/)

This backend is used to explain HTTP communication with Angular 2.  
Read more about Angular 2 in our book. Visit [angular2buch.de](https://angular2buch.de/) for more information (German only).

# Usage

The server is written on top of [restify](http://restify.com/). It provides CRUD operations over books.  
The data is stored in the file system (via [simple-node-db](https://www.npmjs.com/package/simple-node-db)).

## Shared server

A publicly available server is hosted at [book-monkey2-api.angular2buch.de](http://book-monkey2-api.angular2buch.de/).  
Feel free to use it as your test-drive. __Data will be erased periodically.__

## Development

You might want to extend or modify the project.  
Execute the following commands to start the standalone-server:

```
git clone https://github.com/Angular2Buch/book-monkey2-api.git
cd book-monkey2-api
npm install
npm start
```

## Angular-CLI

This package is a [ember-cli](http://ember-cli.com/) / [angular-cli](https://github.com/angular/angular-cli) addon, too.  
Add it to the `node_modules` folder and it will be automatically available at __localhost:3000__ during development.

```
cd <your-angular-cli-project>
npm install book-monkey2-api --saveDev
ng serve
```

![ng serve](public/images/ng-serve.png)


# License
Code released under the [MIT license](https://opensource.org/licenses/MIT).