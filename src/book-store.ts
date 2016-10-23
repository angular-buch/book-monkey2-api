import * as _ from 'lodash';
import { Book } from './shared/book';
import { SomeBooks } from './some-books'

export class BookStore {

  private books: Array<Book>;

  constructor() {
    this.books = SomeBooks.get();
  }

  getAll(): Book[] {
    return _(this.books)
      .sortBy(b => b.isbn)
      .reverse()
      .value();
  };

  getByIsbn(isbn: string) {
    isbn = Book.normalizeIsbn(isbn);
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
    isbn = Book.normalizeIsbn(isbn);
    return this.books = this.books.filter(book => book.isbn !== isbn);
  };

  reset = function (callback) {
    this.allBooks = SomeBooks.get();
  };
}


