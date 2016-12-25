import { NotFoundError, BadRequestError, ConflictError } from 'restify';

import { Book } from './shared/book';
import { BookFactory } from './shared/book-factory';
import { BookStore } from './book-store';

export class BookStoreController {

  constructor(private store: BookStore) { }

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

  checkISBN(req, res, next) {

    let isbn = req.params.isbn;
    let bookExist = this.store.isbnExists(isbn);

    res.send(bookExist, { 'Content-Type': 'application/json; charset=utf-8' });
    next();
  };

  create(req, res, next) {

    let bookJson = req.body;
    let isbn = bookJson.isbn;

    if (!isbn) {
      return next(new BadRequestError('Invalid data: ISBN number is mandatory'));
    }

    if (this.store.isbnExists(isbn)) {
      return next(new ConflictError('Book does already exist'));
    }

    let book = BookFactory.fromJson(bookJson);
    this.store.create(book)

    res.send(201); // 201 Created
    next();
  };

  update(req, res, next) {

    let bookJson = req.body;
    let isbn = bookJson.isbn;

    if (!isbn) {
      return next(new BadRequestError('Invalid data: ISBN number is mandatory'));
    }

    if (req.params.isbn != isbn) {
      return next(new BadRequestError('Invalid data: ISBN from query and body must match'));
    }

    if (!this.store.isbnExists(isbn)) {
      return next(new NotFoundError('Book does not exist'));
    }

    let book = BookFactory.fromJson(bookJson);
    this.store.update(book)

    res.send(200);
    next();
  };

  delete(req, res, next) {

    let isbn = req.params.isbn;
    this.store.delete(isbn);

    res.send(200);
    next();
  };

  reset(req, res, next) {

    this.store.reset();

    if (res && next) {
      res.send(200);
      next();
    }
  };

  rate(req, res, next) {

    let isbn = req.params.isbn;
    let rating = req.body.rating;

    if (!rating) {
      return next(new BadRequestError('Invalid data: rating is mandatory'));
    }

    let book = this.store.getByIsbn(isbn);

    if (!book) {
      return next(new NotFoundError('Book does not exist'));
    }

    book.rating = BookFactory.normalizeRating(rating);

    res.send(200);
    next();
  };
}
