import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../classes/book';


@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`/api/books/`);  
  }
  
  getBook(id: number): Observable<Book> {    
    return this.http.get<Book>(`/api/books/${id}`);  
  }

  createBook(book: Book): Observable<Book> {    
    return this.http.post<Book>(`/api/books/`, book);  
  }

  editBook(book: Book): Observable<Book> {    
    return this.http.put<Book>(`/api/books/`, book);  
  }

  deleteBook(id: number): Observable<Book> {    
    return this.http.delete<Book>(`/api/books/${id}`);  
  }
}
