import { NotFoundError, BadRequestError, ConflictError } from 'restify';
import { BookStore } from './book-store';

class BookStoreController {

  private store: BookStore;

  constructor() {
    this.store = new BookStore();
  }

  getAll(req, res, next) {
    res.send(this.store.getAll(), { 'Content-Type': 'application/json; charset=utf-8' });
    next();
  };

  getByISBN(req, res, next) {

    let isbn = req.params.isbn;
    let book = this.store.getByIsbn(isbn);

    if (!book) {
      return next(new NotFoundError('Book does not exist'));
    }

    res.send(book, { 'Content-Type': 'application/json; charset=utf-8' });
    next();
  };

  create(req, res, next) {

    let bookJson = req.body;
    var isbn = bookJson.isbn;

    if (!isbn) {
      return next(new BadRequestError('Invalid data: ISBN number is mandatory'));
    }

    if (this.store.isbnExists(isbn)) {
      return next(new ConflictError('Book does already exist'));
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
      return next(new BadRequestError('Invalid data: ISBN number is mandatory'));
    }

    if (req.params.isbn != isbn) {
      return next(new BadRequestError('Invalid data: ISBN from query and body must match'));
    }

    dbservice.getBookByISBN(isbn, function (err, row) {
      if (err) return next(err);

      // error if record doesn't exist
      if (!row) {
        return next(new NotFoundError('Book does not exist'));
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




}


