"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thumbnail_1 = require("./thumbnail");
exports.Thumbnail = thumbnail_1.Thumbnail;
var Book = (function () {
    function Book(isbn, title, authors, published, subtitle, rating, thumbnails, description) {
        this.isbn = isbn;
        this.title = title;
        this.authors = authors;
        this.published = published;
        this.subtitle = subtitle;
        this.rating = rating;
        this.thumbnails = thumbnails;
        this.description = description;
    }
    return Book;
}());
exports.Book = Book;
//# sourceMappingURL=book.js.map