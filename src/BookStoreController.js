'use strict';

var restify = require('restify');
var dbservice = require('./inMemoryDB');

exports.getAll = function (req, res, next) {

    dbservice.getAllBooks(function (err, list) {
        if (err) return next(err);

        // add a thumbnial if no Thumbnail is in data collection
        list.forEach(function (row) {
            row = addThumbnailIfNotSet(row);
        });

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

        // add a thumbnial if no Thumbnail is in data collection
        row = addThumbnailIfNotSet(row);

        res.send(row, { 'Content-Type': 'application/json; charset=utf-8' });
        next();
    });
};

exports.checkISBN = function (req, res, next) {

    var isbn = req.params.isbn;

    dbservice.isbnExists(isbn, function (err, exists) {
        if (err) return next(err);

        res.send(exists, { 'Content-Type': 'application/json; charset=utf-8' });
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

exports.del = function (req, res, next) {

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

exports.rate = function (req, res, next) {
    var isbn = req.params.isbn;
    var rating = req.body.rating;

    if (!rating) {
        return next(new restify.BadRequestError('Invalid data: rating is mandatory'));
    }

    dbservice.getBookByISBN(isbn, function (err, book) {
        if (err) return next(err);

        // error if record already exists
        if (!book) {
            return next(new restify.NotFoundError('Book does not exist'));
        }

        // set new rating value
        book.rating = rating;

        dbservice.updateBook(book, function (err) {
            if (err) return next(err);
            res.send(200); // 200 success
            next();
        });
    });
};

function addThumbnailIfNotSet(book) {
    if (!book.thumbnails || !book.thumbnails.length || !book.thumbnails[0].url) {
        book.thumbnails = [{
            "url": "https://angular-buch.com/img/book.png",
            "title": "Kein Vorschaubild verfügbar"
        }]
    }
    return book;
}
