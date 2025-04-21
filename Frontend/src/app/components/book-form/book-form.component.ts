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
  
  genres: string[] = [];
  
  bookForm = new FormGroup({
      title: new FormControl(''),
      year: new FormControl(''),
      genre: new FormControl(''),
      abstract: new FormControl(''),
      summary: new FormControl(''),
      rating: new FormControl(1),
  });
  
  onSubmit() {
  
  }

}
