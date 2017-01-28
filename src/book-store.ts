import * as _ from 'lodash';

import { Book } from './shared/book';
import { BookFactory } from './shared/book-factory';
import { SomeBooks } from './some-books';

export class BookStore {

  private books: Book[];

  constructor() {
    this.books = SomeBooks.get();
  }

  getAll(): Book[] {
    return _(this.books)
      .sortBy(b => b.isbn)
      .reverse()
      .value();
  };

  getAllBySearch(searchTerm: string): Book[] {

    searchTerm = searchTerm.toLowerCase();
    let containsSearchTerm = (checked) => ~checked.toLowerCase().indexOf(searchTerm);

    return _(this.books)
      .filter(b =>
          containsSearchTerm(b.isbn) ||
          containsSearchTerm(b.title) ||
          _.some(b.authors, containsSearchTerm) ||
          containsSearchTerm(b.published.toISOString()) ||
          containsSearchTerm(b.subtitle) ||
          containsSearchTerm(b.description))
      .sortBy(b => b.isbn)
      .reverse()
      .value();
  };

  getByIsbn(isbn: string) {
    isbn = BookFactory.normalizeIsbn(isbn);
    return this.books.find(book => book.isbn === isbn)
  };

  isbnExists(isbn: string) {
    return !!this.getByIsbn(isbn);
  }

  create(book: Book) {
    this.books.push(book);
  };

  update(book: Book) {
    this.delete(book.isbn);
    this.create(book);
  };

  delete(isbn: string) {
    isbn = BookFactory.normalizeIsbn(isbn);
    return this.books = this.books.filter(book => book.isbn !== isbn);
  };

  reset() {
    this.books = SomeBooks.get();
  };
}
