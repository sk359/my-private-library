import { Component, Input } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { Book } from '@app/classes/book';


@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  @Input()
  book: Book | null = null;
  
  genres: string[] = ["Roman", "Soziologie"];
  keywords: string[] = ["Roman", "Soziologie"];
  
  bookForm = new FormGroup({
      title: new FormControl(this.book?.title || ''),
      year: new FormControl(this.book?.year || ''),
      author: new FormControl(''), // TODO
      genre: new FormControl(this.book?.genre || ''),
      abstract: new FormControl(this.book?.abstract || ''),
      summary: new FormControl(this.book?.summary || ''),
      rating: new FormControl(this.book?.rating || 1),
  });
  
  onSubmit() {
  
  }

}
