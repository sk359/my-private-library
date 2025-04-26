import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Book, DatabaseBook } from '@app/classes/book';
import { BackendService } from '@app/services/backend.service';

const baseUrl = "http://localhost:5085/books";


@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: BackendService) {}

  async getAllBooks(limit: number = -1): Promise<Book[]> {
    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    const databaseBooks: DatabaseBook[] = await this.http.get(`${baseUrl}?${params}`);
    return databaseBooks.map(book => Book.fromDatabase(book));
  }
  
  async getBook(id: number): Promise<Book> {    
    return this.http.get(`${baseUrl}/${id}`);  
  }

  async createBook(book: Book): Promise<Book> {    
    return this.http.post(`${baseUrl}`, book);  
  }

  editBook(book: Book): Promise<Book> {    
    return this.http.put(`${baseUrl}`, book);  
  }

  deleteBook(id: number): Promise<Book> {    
    return this.http.delete(`${baseUrl}/${id}`);  
  }
}
