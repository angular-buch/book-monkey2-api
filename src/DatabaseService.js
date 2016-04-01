'use strict';

var SimpleDb = require('simple-node-db');

//initialize database
var db = new SimpleDb('../database');

/***************************************/

exports.getAllBooks = function(callback){
    var rowCallback = function(key, value) {
        if(key.indexOf('book:') >= 0){
            return JSON.parse(value);
        }
    };

    var params = {
        start: 'book:',
        end: 'book:~'
    };

    db.query(params, rowCallback, callback);
}


exports.getBookByISBN = function(isbn, callback){
    var key = db.createDomainKey('book', isbn);
    db.find(key, callback);
}



exports.createBook = function(book, callback){
    if(!book) return callback(new Error('No record given'));

    var key = db.createDomainKey('book', book.isbn);
    db.insert(key, book, callback);
}



exports.updateBook = function(book, callback){
    if(!book) return callback(new Error('No record given'));

    var key = db.createDomainKey('book', book.isbn);
    db.update(key, book, callback);
}



exports.deleteBook = function(isbn, callback){
    if(!isbn) return callback(new Error('No record given'));

    var key = db.createDomainKey('book', isbn);
    db.delete(key, callback);
}
