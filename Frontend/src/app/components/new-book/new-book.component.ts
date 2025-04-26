import { Component } from '@angular/core';
import { Book } from '@app/classes/book';
import { BookFormComponent } from '@app/components/book-form/book-form.component';
import { BookServiceService } from '@app/services/book-service.service';
import { LibraryComponent } from '@app/components/library/library.component';
import { EventManagerService } from '@app/services/event-manager.service';


@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [BookFormComponent, LibraryComponent],
  providers: [EventManagerService],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.scss'
})
export class NewBookComponent {

  constructor(private _backend: BookServiceService, private eventManager: EventManagerService) {}
  
  book: Book | null = null;

  async onSave(book: any) {    
    await this._backend.createBook(book);
    this.eventManager.announceBookCreated();
  }  

}
