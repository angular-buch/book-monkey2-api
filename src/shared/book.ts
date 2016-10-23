import { Thumbnail } from './thumbnail';
export { Thumbnail } from './thumbnail';

export class Book {

  // an empty book is prefilled with empty values and has no empty arrays for easier form handlng
  static empty(): Book {
    return new Book('', '', [''], new Date(), '', 0, [{ url: '', title: '' }], '');
  }

  // a new book from JSON is based on the empty book
  static fromJson(json: any) {

    let book = Book.empty();

    if (json.isbn && typeof(json.isbn) == "string") {
      book.isbn = json.isbn;
    }

    if (json.title && typeof(json.title) == "string") {
      book.title = json.title;
    }

    if (json.authors && typeof(json.authors) == "object" && json.authors.length) {

      let authors = new Array<string>();
      for(let author of json.authors) {
        if (author && typeof(author) == "string") {
          authors.push(author);
        }
      }

      if (authors.length) {
        book.authors = authors;
      }
    }

    if (json.published && typeof(json.published) == "string") {

      let date = new Date(json.published);
      if (date.toString() != "Invalid Date") {
        book.published = date;
      }
    }

    book.subtitle = !json.subtitle ? book.subtitle : json.subtitle

    if (json.published && typeof(json.published) == "string") {

    }

  }


  private _isbn: string;

  constructor(
    isbn: string,
    public title: string,
    public authors: string[],
    public published: Date,
    public subtitle?: string,
    public rating?: number,
    public thumbnails?: Thumbnail[],
    public description?: string
  ) {
    this.isbn = isbn;
  }

  get isbn() {
    return this._isbn;
  }

  set isbn(value) {
    this._isbn = Book.normalizeIsbn(value);
  }

  // isbn is always normalized to ensure more consistency
  public static normalizeIsbn(isbn: string) {
    return isbn.replace(/\s|-/gi, '');
  }
}
