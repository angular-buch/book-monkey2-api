"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thumbnail_1 = require("./thumbnail");
var book_1 = require("./book");
var BookFactory = (function () {
    function BookFactory() {
    }
    BookFactory.empty = function () {
        var defaultThumbnail = new thumbnail_1.Thumbnail('https://angular2buch.de/img/book.png', 'Kein Vorschaubild verfügbar');
        return new book_1.Book('', '', [''], new Date(), '', 3, [defaultThumbnail], '');
    };
    BookFactory.fromJson = function (json) {
        var book = BookFactory.empty();
        if (this.validString(json.isbn)) {
            book.isbn = BookFactory.normalizeIsbn(json.isbn);
        }
        if (this.validString(json.title)) {
            book.title = json.title.trim();
        }
        if (this.validArray(json.authors)) {
            var authors = [];
            for (var _i = 0, _a = json.authors; _i < _a.length; _i++) {
                var author = _a[_i];
                if (this.validString(author)) {
                    authors.push(author.trim());
                }
            }
            if (authors.length) {
                book.authors = authors;
            }
        }
        if (this.validString(json.published) &&
            this.validDate(json.published)) {
            book.published = new Date(json.published);
        }
        if (this.validString(json.subtitle)) {
            book.subtitle = json.subtitle.trim();
        }
        if (this.validNumber(json.rating)) {
            book.rating = BookFactory.normalizeRating(json.rating);
        }
        if (this.validArray(json.thumbnails)) {
            var thumbnails = [];
            for (var _b = 0, _c = json.thumbnails; _b < _c.length; _b++) {
                var thumbnail = _c[_b];
                if (this.validObject(thumbnail) &&
                    this.validString(thumbnail.url) &&
                    this.validString(thumbnail.title)) {
                    thumbnails.push(new thumbnail_1.Thumbnail(thumbnail.url.trim(), thumbnail.title.trim()));
                }
            }
            if (thumbnails.length) {
                book.thumbnails = thumbnails;
            }
        }
        if (this.validString(json.description)) {
            book.description = json.description.trim();
        }
        return book;
    };
    BookFactory.normalizeIsbn = function (isbn) {
        var i = isbn + '';
        return i.replace(/[^0-9]/g, '');
    };
    BookFactory.normalizeRating = function (rating) {
        var r = +rating;
        return (r < 1) ? 1 : (r > 5) ? 5 : r;
    };
    BookFactory.validString = function (str) {
        return str && typeof str == 'string';
    };
    BookFactory.validDate = function (date) {
        return (new Date(date)).toString() != 'Invalid Date';
    };
    BookFactory.validArray = function (arr) {
        return arr && Array.isArray(arr) && arr.length;
    };
    BookFactory.validObject = function (obj) {
        return obj && typeof obj == 'object';
    };
    BookFactory.validNumber = function (no) {
        return no && typeof no == 'number';
    };
    return BookFactory;
}());
exports.BookFactory = BookFactory;
//# sourceMappingURL=book-factory.js.map