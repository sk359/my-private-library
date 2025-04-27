import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormControl, ReactiveFormsModule, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import { Book } from '@app/classes/book';
import { Keyword } from '@app/classes/enums';
import { Genre as GenreEnum, Keyword as KeywordEnum } from '@app/classes/enums';

/**
 * forbiddenYearValidator is a factory that returns a function that returns null if the input is valid
 * and an object with additional data otherwise
 * @param nameRe 
 * @returns 
 */
function forbiddenYearValidator(): ValidatorFn {  
  return (control: AbstractControl): ValidationErrors | null => {    
    //const validYear = /^\d{4}$/;
    let isValid = true; //validYear.test(control.value);  
    if (isValid) {
      const currentYear: number = new Date().getFullYear();  
      if (control.value < 1800 || control.value > currentYear) {
        console.log(`Year ${control.value} not valid`);
        isValid = false;
      }
    }    
    return isValid ? null : {invalidYear: {value: control.value}};  
  };
}



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
  
  genres: string[] = Object.values(GenreEnum) as string[];
  keywords: string[] = Object.values(KeywordEnum) as string[];
  currentYear: number = new Date().getFullYear();  

  bookForm = new FormGroup({
    id: new FormControl(-1),
    title: new FormControl(''),
    year: new FormControl(2020),
    author: new FormControl(''), // TODO more than one
    genre: new FormControl(''),
    keywords: new FormControl([] as Keyword[]),
    shortSummary: new FormControl(''),
    summary: new FormControl(''),
    rating: new FormControl(1),
});

  ngOnChanges() {
    this.clearForm();
  }
  
  clearForm() {
    this.bookForm = new FormGroup({
      id: new FormControl(this.book?.id || -1),
      title: new FormControl(this.book?.title || ''),
      year: new FormControl(this.book?.year || 2020, [Validators.required, forbiddenYearValidator()]),
      author: new FormControl(this.book?.author || ''), // TODO more than one
      genre: new FormControl(this.book?.genre || ''),
      keywords: new FormControl(this.book?.keywords || [] as Keyword[]),
      shortSummary: new FormControl(this.book?.shortSummary || ''),
      summary: new FormControl(this.book?.summary || ''),
      rating: new FormControl(this.book?.rating || 1),
    });
  }
  
  onSubmit() {     
    if (!this.bookForm.valid) { // TODO does not work
      console.log("Ungültige Eingaben vorhanden");
      return;
    }   
    this.onSave.emit(this.bookForm.value as any);  
    this.clearForm();    
  }

  get year() {    
    return this.bookForm.get('year');  
  }

  get yearErrorWarning(): string {
    return `Jahr muss zwischen 1800 und ${this.currentYear} liegen`;
  }

}
