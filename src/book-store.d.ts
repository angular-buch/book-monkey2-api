import { Book } from './shared/book';
export declare class BookStore {
    private books;
    constructor();
    getAll(): Book[];
    getAllBySearch(searchTerm: string): Book[];
    getByIsbn(isbn: string): Book;
    isbnExists(isbn: string): boolean;
    create(book: Book): void;
    update(book: Book): void;
    delete(isbn: string): Book[];
    reset(): void;
}
