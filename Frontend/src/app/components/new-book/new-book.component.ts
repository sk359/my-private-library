import { Component, Input } from '@angular/core';
import { Book } from '@app/classes/book';
import { BookFormComponent } from '@app/components/book-form/book-form.component';
import { BookServiceService } from '@app/services/book-service.service';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [BookFormComponent],
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
