import { Component } from '@angular/core';
import { Book } from '../../classes/book';
import { BookServiceService } from '../../services/book-service.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {


  testBook: Book = new Book(1, "ABC", 1999, "Krimi", "blah", "summary", 3);
  library: Book[] = [this.testBook];

  constructor(private bookService: BookServiceService) {}

  ngOnInit() {

  }

  private getLibrary() {

  }
}
