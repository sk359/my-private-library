import { Component } from '@angular/core';
import { Book } from '@app/classes/book';
import { BookFormComponent } from '@app/components/book-form/book-form.component';
import { BookServiceService } from '@app/services/book-service.service';
import { LibraryComponent } from '@app/components/library/library.component';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [BookFormComponent, LibraryComponent],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.scss'
})
export class NewBookComponent {

  constructor(private _backend: BookServiceService) {}
  
  book: Book | null = null;

  onSave(book: any) {
    console.log("onsave", book);
    //book.authors = [book.authors];
    this._backend.createBook(book);
  }  

}
