'use strict';

var restify = require('restify');
var dbservice = require('./inMemoryDB');

exports.getAll = function (req, res, next) {

    dbservice.getAllBooks(function (err, list) {
        if (err) return next(err);
        res.send(list, { 'Content-Type': 'application/json; charset=utf-8' });
        next();
    });
};

exports.getByISBN = function (req, res, next) {

    var isbn = req.params.isbn;

    dbservice.getBookByISBN(isbn, function (err, row) {
        if (err) return next(err);

        // error if record doesn't exist
        if (!row) {
            return next(new restify.NotFoundError('Book does not exist'));
        }

        res.send(row, { 'Content-Type': 'application/json; charset=utf-8' });
        next();
    });
};

exports.create = function (req, res, next) {

    var book = req.body;
    var isbn = book.isbn;

    if (!isbn) {
        return next(new restify.BadRequestError('Invalid data: ISBN number is mandatory'));
    }

    dbservice.getBookByISBN(isbn, function (err, row) {
        if (err) return next(err);

        // error if record already exists
        if (row) {
            return next(new restify.ConflictError('Book does already exist'));
        }

        dbservice.createBook(book, function (err) {
            if (err) return next(err);
            res.send(201); // 201 Created
            next();
        });
    });
};

exports.update = function (req, res, next) {

    var book = req.body;
    var isbn = book.isbn;

    if (!isbn) {
        return next(new restify.BadRequestError('Invalid data: ISBN number is mandatory'));
    }

    if (req.params.isbn != isbn) {
        return next(new restify.BadRequestError('Invalid data: ISBN from query and body must match'));
    }

    dbservice.getBookByISBN(isbn, function (err, row) {
        if (err) return next(err);

        // error if record doesn't exist
        if (!row) {
            return next(new restify.NotFoundError('Book does not exist'));
        }

        dbservice.updateBook(book, function (err) {
            if (err) return next(err);
            res.send(200);
            next();
        });
    });
};

exports.delete = function (req, res, next) {

    var isbn = req.params.isbn;

    dbservice.deleteBook(isbn, function (err) {
        if (err) return next(err);
        res.send(200);
        next();
    });
};

exports.getDbservice = function () {
    return dbservice;
}

exports.reset = function (req, res, next) {

    dbservice.reset(function (err) {
        if (err) return next(err);
        res.send(200);
        next();
    });
};