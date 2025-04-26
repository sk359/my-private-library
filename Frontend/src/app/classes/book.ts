import { Author } from './author';
import { Keyword } from './enums';
import { UtilsService } from '../services/utils.service';

export interface DatabaseBook {
    id: number;
    title: string;
    year: number;
    author: string;
    genre: string;
    shortSummary: string;
    summary?: string;
    rating: number; 
    keywords: string[];
}


export class Book {
    id: number;
    title: string;
    year: number;
    author: string;
    genre: string;
    shortSummary: string;
    summary?: string;
    rating: number; 
    keywords: Keyword[] = [];

    /**
     * 
     [{"id":1,"title":"Psychoanalyse und Religion","year":1966,"genre":"Psychologie","abstract":"Vorlesung an der Yale Universtität","summary":"","rating":7,"authors":["Erich Fromm"],"keywords":["Psychologie","Religion","Psychoanalyse"]},{"id":2,"title":"Ungleich vereint","year":2024,"genre":"Politik","abstract":"","summary":"","rating":8,"authors":["Steffen Mau"],"keywords":["Ostdeutschland","AfD"]}]
     */

    constructor(id: number, title: string, year: number, author: string, genre: string, abstract: string, summary: string = "", rating: number = 1) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.author = author;
        this.genre = genre;
        this.shortSummary = abstract;
        this.summary = summary;
        this.rating = rating;
    }    

    public get authorString() : string {
        //const authors = UtilsService.sortListByAttribute(this.authors, "name");
        //return authors.map(x => x.name).join("\n");
        return this.author;
    }

    public get keywordString(): string {
        return this.keywords.join(" | ");
    }

    public static fromDatabase(book: DatabaseBook): Book {
        const bookObject = new Book(book.id, book.title, book.year, book.author, book.genre, book.shortSummary, book.summary, book.rating);
        //bookObject.authors = book.authors.map(name => new Author(name));
        bookObject.keywords = book.keywords as Keyword[];
        return bookObject;
    }

    
}