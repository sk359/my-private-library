import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { Book } from '@app/classes/book';
import { Keyword } from '@app/classes/enums';



@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent implements OnChanges {

  @Input()
  book: Book | null = null;

  @Output() onSave = new EventEmitter<Book>();

  constructor() {}
  
  genres: string[] = ["Roman", "Soziologie"];
  keywords: string[] = ["Roman", "Soziologie"];

  bookForm = new FormGroup({
    id: new FormControl(-1),
    title: new FormControl(''),
    year: new FormControl(0),
    author: new FormControl(''), // TODO more than one
    genre: new FormControl(''),
    keywords: new FormControl([] as Keyword[]),
    shortSummary: new FormControl(''),
    summary: new FormControl(''),
    rating: new FormControl(1),
});

  ngOnChanges() {
    this.bookForm = new FormGroup({
      id: new FormControl(this.book?.id || -1),
      title: new FormControl(this.book?.title || ''),
      year: new FormControl(this.book?.year || 0),
      author: new FormControl(this.book?.author || ''), // TODO more than one
      genre: new FormControl(this.book?.genre || ''),
      keywords: new FormControl(this.book?.keywords || [] as Keyword[]),
      shortSummary: new FormControl(this.book?.shortSummary || ''),
      summary: new FormControl(this.book?.summary || ''),
      rating: new FormControl(this.book?.rating || 1),
    });
  }
  
  
  
  onSubmit() {    
    this.onSave.emit(this.bookForm.value as any);      
  }

}
