import { BookStore } from './book-store';
export declare class BookStoreController {
    private store;
    constructor(store: BookStore);
    getAll(req: any, res: any, next: any): void;
    getAllBySearch(req: any, res: any, next: any): void;
    getByISBN(req: any, res: any, next: any): any;
    checkISBN(req: any, res: any, next: any): void;
    create(req: any, res: any, next: any): any;
    update(req: any, res: any, next: any): any;
    delete(req: any, res: any, next: any): void;
    reset(req: any, res: any, next: any): void;
    rate(req: any, res: any, next: any): any;
}
