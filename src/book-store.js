"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var book_factory_1 = require("./shared/book-factory");
var some_books_1 = require("./some-books");
var BookStore = (function () {
    function BookStore() {
        this.books = some_books_1.SomeBooks.get();
    }
    BookStore.prototype.getAll = function () {
        return _(this.books)
            .sortBy(function (b) { return b.isbn; })
            .reverse()
            .value();
    };
    ;
    BookStore.prototype.getAllBySearch = function (searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        var containsSearchTerm = function (checked) { return ~checked.toLowerCase().indexOf(searchTerm); };
        return _(this.books)
            .filter(function (b) {
            return containsSearchTerm(b.isbn) ||
                containsSearchTerm(b.title) ||
                _.some(b.authors, containsSearchTerm) ||
                containsSearchTerm(b.published.toISOString()) ||
                containsSearchTerm(b.subtitle) ||
                containsSearchTerm(b.description);
        })
            .sortBy(function (b) { return b.isbn; })
            .reverse()
            .value();
    };
    ;
    BookStore.prototype.getByIsbn = function (isbn) {
        isbn = book_factory_1.BookFactory.normalizeIsbn(isbn);
        return this.books.find(function (book) { return book.isbn === isbn; });
    };
    ;
    BookStore.prototype.isbnExists = function (isbn) {
        return !!this.getByIsbn(isbn);
    };
    BookStore.prototype.create = function (book) {
        this.books.push(book);
    };
    ;
    BookStore.prototype.update = function (book) {
        this.delete(book.isbn);
        this.create(book);
    };
    ;
    BookStore.prototype.delete = function (isbn) {
        isbn = book_factory_1.BookFactory.normalizeIsbn(isbn);
        return this.books = this.books.filter(function (book) { return book.isbn !== isbn; });
    };
    ;
    BookStore.prototype.reset = function () {
        this.books = some_books_1.SomeBooks.get();
    };
    ;
    return BookStore;
}());
exports.BookStore = BookStore;
//# sourceMappingURL=book-store.js.map