import { Thumbnail } from './thumbnail';
export { Thumbnail } from './thumbnail';
export declare class Book {
    isbn: string;
    title: string;
    authors: string[];
    published: Date;
    subtitle: string;
    rating: number;
    thumbnails: Thumbnail[];
    description: string;
    constructor(isbn: string, title: string, authors: string[], published: Date, subtitle: string, rating: number, thumbnails: Thumbnail[], description: string);
}
