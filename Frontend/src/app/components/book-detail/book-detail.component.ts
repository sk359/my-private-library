import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '@app/classes/book';
import { Genre } from '@app/classes/enums';


class GenreStyle {
  background: string;
  textColor: string;
  constructor(background: string, textColor: string = "black") {
    this.background = background;
    this.textColor = textColor;
  }
  
  toStyleObject(): any {
    return {'background-color': this.background, 'color': this.textColor};
  }
}



@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {

  @Input()
  book!: Book | null;

  genreStyle = {
      [Genre.POLITIK]: new GenreStyle("blue", "white"),
      [Genre.RELIGION]: new GenreStyle("white"), 
      [Genre.ROMAN]: new GenreStyle("red", "white"), 
      [Genre.SOZIOLOGIE]: new GenreStyle("green", "white"), 
      [Genre.PSYCHOLOGIE]: new GenreStyle("lightblue"), 
    };

  getBackgroundColor(): GenreStyle {
    if (this.book) {
      return this.genreStyle[this.book.genre as Genre];
    } else {
      return new GenreStyle("white");
    }
  }

}
