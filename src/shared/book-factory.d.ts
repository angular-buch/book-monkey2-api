import { Book } from './book';
export declare class BookFactory {
    static empty(): Book;
    static fromJson(json: any): Book;
    static normalizeIsbn(isbn: string): string;
    static normalizeRating(rating: number): number;
    private static validString(str);
    private static validDate(date);
    private static validArray(arr);
    private static validObject(obj);
    private static validNumber(no);
}
