"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var restify_1 = require("restify");
var book_factory_1 = require("./shared/book-factory");
var BookStoreController = (function () {
    function BookStoreController(store) {
        this.store = store;
    }
    BookStoreController.prototype.getAll = function (req, res, next) {
        res.send(this.store.getAll(), { 'Content-Type': 'application/json; charset=utf-8' });
        next();
    };
    ;
    BookStoreController.prototype.getAllBySearch = function (req, res, next) {
        var searchTerm = req.params.search;
        res.send(this.store.getAllBySearch(searchTerm), { 'Content-Type': 'application/json; charset=utf-8' });
        next();
    };
    ;
    BookStoreController.prototype.getByISBN = function (req, res, next) {
        var isbn = req.params.isbn;
        var book = this.store.getByIsbn(isbn);
        if (!book) {
            return next(new restify_1.NotFoundError('Book does not exist'));
        }
        res.send(book, { 'Content-Type': 'application/json; charset=utf-8' });
        next();
    };
    ;
    BookStoreController.prototype.checkISBN = function (req, res, next) {
        var isbn = req.params.isbn;
        var bookExist = this.store.isbnExists(isbn);
        res.send(bookExist, { 'Content-Type': 'application/json; charset=utf-8' });
        next();
    };
    ;
    BookStoreController.prototype.create = function (req, res, next) {
        var bookJson = req.body;
        var isbn = bookJson.isbn;
        if (!isbn) {
            return next(new restify_1.BadRequestError('Invalid data: ISBN number is mandatory'));
        }
        if (this.store.isbnExists(isbn)) {
            return next(new restify_1.ConflictError('Book does already exist'));
        }
        var book = book_factory_1.BookFactory.fromJson(bookJson);
        this.store.create(book);
        res.send(201); // 201 Created
        next();
    };
    ;
    BookStoreController.prototype.update = function (req, res, next) {
        var bookJson = req.body;
        var isbn = bookJson.isbn;
        if (!isbn) {
            return next(new restify_1.BadRequestError('Invalid data: ISBN number is mandatory'));
        }
        if (req.params.isbn != isbn) {
            return next(new restify_1.BadRequestError('Invalid data: ISBN from query and body must match'));
        }
        if (!this.store.isbnExists(isbn)) {
            return next(new restify_1.NotFoundError('Book does not exist'));
        }
        var book = book_factory_1.BookFactory.fromJson(bookJson);
        this.store.update(book);
        res.send(200);
        next();
    };
    ;
    BookStoreController.prototype.delete = function (req, res, next) {
        var isbn = req.params.isbn;
        this.store.delete(isbn);
        res.send(200);
        next();
    };
    ;
    BookStoreController.prototype.reset = function (req, res, next) {
        this.store.reset();
        if (res && next) {
            res.send(200);
            next();
        }
    };
    ;
    BookStoreController.prototype.rate = function (req, res, next) {
        var isbn = req.params.isbn;
        var rating = req.body.rating;
        if (!rating) {
            return next(new restify_1.BadRequestError('Invalid data: rating is mandatory'));
        }
        var book = this.store.getByIsbn(isbn);
        if (!book) {
            return next(new restify_1.NotFoundError('Book does not exist'));
        }
        book.rating = book_factory_1.BookFactory.normalizeRating(rating);
        res.send(200);
        next();
    };
    ;
    return BookStoreController;
}());
exports.BookStoreController = BookStoreController;
//# sourceMappingURL=book-store-controller.js.map