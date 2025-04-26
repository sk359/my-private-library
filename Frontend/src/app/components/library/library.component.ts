import { Component, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
// import { Observable } from 'rxjs';
import { Book } from '@app/classes/book';
import { BookServiceService } from '@app/services/book-service.service';
import { BookDetailComponent } from '@app/components/book-detail/book-detail.component';
import { Genre } from '@app/classes/enums';
import { BookFormComponent } from '@app/components/book-form/book-form.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [BookDetailComponent, BookFormComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  
  library: Book[] = [];
  selectedBook: Book | null = null;
  //editMode = false;
  //books$: Observable<Book[]>;

  @ViewChild('detailModal') detailModal: any;

  constructor(private bookService: BookServiceService, private _backend: BookServiceService) { }

  async ngOnInit() {
    this.loadLibrary();
  }

  private async loadLibrary() {
    this.library = await this.bookService.getAllBooks();
    console.log(this.library);
  }

  showDetails(book: Book) {
    this.selectedBook = book;  
    const myModalAlternative = new bootstrap.Modal('#detailModal', { keyboard: false });
    myModalAlternative.show();
    //this.detailModal.nativeElement.show();
  }

  async editBook(book: Book) {
    this.selectedBook = book;      
    const myModalAlternative = new bootstrap.Modal('#editModal', { keyboard: false });
    myModalAlternative.show();
  }

  deleteBook(bookId: number) {
    console.log("delete", bookId);    
  }  

  onSave(book: any) {
    console.log("onsave", book);
    //book.authors = [book.authors];
    this._backend.editBook(book);
  }  
  
}
