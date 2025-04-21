import { Component, Input } from '@angular/core';
import { Book } from '@app/classes/book';
import { BookFormComponent } from '@app/components/book-form/book-form.component';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [BookFormComponent],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.scss'
})
export class NewBookComponent {

  
  book: Book | null = null;

  

}
