import { Author } from './author';
import { Keyword } from './enums';
import { UtilsService } from '../services/utils.service';

export class Book {
    id: number;
    title: string;
    year: number;
    authors: Author[] = [];
    genre: string;
    abstract: string;
    summary: string;
    rating: number; 
    keywords: Keyword[] = [];

    constructor(id: number, title: string, year: number, genre: string, abstract: string, summary: string = "", rating: number = 1) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.abstract = abstract;
        this.summary = summary;
        this.rating = rating;
    }

    public addKeyword(keyword: Keyword) {
        this.keywords.push(keyword);
    }

    public addAuthor(author: Author) {
        this.authors.push(author);
    }

    public get authorString() : string {
        const authors = UtilsService.sortListByAttribute(this.authors, "name");
        return authors.map( x => x.name).join(",");
    }

    
}