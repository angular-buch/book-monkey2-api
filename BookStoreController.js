'use strict';

var restify = require('restify');
var dbservice = require('./DatabaseService');


exports.getAll = function(req, res, next){
    dbservice.getAllBooks(function(err, list){
        if(err) return next(err);
        res.send(list);
    });
}



exports.getByISBN = function(req, res, next){
    var isbn = req.params.isbn;
    dbservice.getBookByISBN(isbn, function(err, row){
        if(err) return next(err);
        res.send(row);
    });
}



exports.create = function(req, res, next){
    var isbn = req.params.isbn;
    var book = req.body;

    //search for this book to make sure it doesn't exist
    dbservice.getBookByISBN(isbn, function(err, row){
        //error if record already exists
        if(row) return next(new restify.BadRequestError('Entry does already exist'));

        //sanitize book object
        book.isbn = isbn;

        dbservice.createBook(book, function(err){
            if(err) return next(err);
            res.send(204);
        });

    });
}



exports.update = function(req, res, next){
    var isbn = req.params.isbn;
    var book = req.body;

    //search for this book to make sure it doesn't exist
    dbservice.getBookByISBN(isbn, function(err, row){
        //error if record doesn't exist
        if(row === undefined){
            return next(new restify.BadRequestError('Entry does not exist'));
        }

        //sanitize book object
        book.isbn = isbn;

        dbservice.createBook(book, function(err){
            if(err) return next(err);
            res.send(204);
        });

    });
}



exports.delete = function(req, res, next){
    var isbn = req.params.isbn;

    dbservice.deleteBook(isbn, function(err){
        if(err) return next(err);
        res.send(204);
    });
}
