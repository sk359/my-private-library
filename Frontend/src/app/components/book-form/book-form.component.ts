import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() onSave = new EventEmitter<Book>();

  constructor() {}
  
  genres: string[] = ["Roman", "Soziologie"];
  keywords: string[] = ["Roman", "Soziologie"];
  
  bookForm = new FormGroup({
      id: new FormControl(-1),
      title: new FormControl(this.book?.title || ''),
      year: new FormControl(this.book?.year || ''),
      author: new FormControl(''), // TODO more than one
      genre: new FormControl(this.book?.genre || ''),
      //keywords: new FormControl(this.book?.keywords || ''),
      shortSummary: new FormControl(this.book?.shortSummary || ''),
      summary: new FormControl(this.book?.summary || ''),
      rating: new FormControl(this.book?.rating || 1),
  });
  
  onSubmit() {    
    this.onSave.emit(this.bookForm.value as any);      
  }

}
