import { Component, ViewChild, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { orderBy } from 'lodash';
// import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Book } from '@app/classes/book';
import { BookServiceService } from '@app/services/book-service.service';
import { BookDetailComponent } from '@app/components/book-detail/book-detail.component';
import { BookFormComponent } from '@app/components/book-form/book-form.component';
import { EventManagerService } from '@app/services/event-manager.service';
import { SortIconsComponent } from '@app/components/sort-icons/sort-icons.component';


@Component({
  selector: 'app-library',
  standalone: true,
  imports: [BookDetailComponent, BookFormComponent, SortIconsComponent],
  //providers: [EventManagerService], // when used it does not work! Has to be taken frpm parent component?
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  
  library: Book[] = [];
  selectedBook: Book | null = null;  
  subscription: Subscription;

  @Input()
  limit: number = -1;

  @ViewChild('detailModal') detailModal: any;

  constructor(
    private bookService: BookServiceService, 
    private _backend: BookServiceService, 
    private eventManager: EventManagerService) { 
      this.subscription = eventManager.newBookCreate$.subscribe( (newValue) => {
        this.loadLibrary();
      });
    }

  async ngOnInit() {
    this.loadLibrary();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  private async loadLibrary() {
    const lmt = this.limit && this.limit > -0 ? this.limit : undefined; 
    console.log("limit", this.limit);
    this.library = await this.bookService.getAllBooks(lmt);
    console.log(this.library);
  }

  showDetails(book: Book) {
    this.selectedBook = book;  
    const myModalAlternative = new bootstrap.Modal('#detailModal', { keyboard: false });
    myModalAlternative.show();   
  }

  async editBook(book: Book) {
    this.selectedBook = book;      
    const myModalAlternative = new bootstrap.Modal('#editModal', { keyboard: false });
    myModalAlternative.show();
  }

  async deleteBook(bookId: number) {
    await this._backend.deleteBook(bookId);
    this.loadLibrary();
  }  

  async onSave(book: any) {    
    await this._backend.editBook(book);    
    const myModalEl = document.getElementById('editModal');
    const modal = bootstrap.Modal.getInstance(myModalEl as any);
    modal?.hide();
    this.loadLibrary();    
  }  

  disableEdit(): boolean {
    return !Boolean(this.limit) || this.limit > 0; 
  }  

  sortByRating(event: {order: string}) {
    console.log(event);
    this.library = orderBy(this.library, ['rating', 'title'], [event.order as any, 'asc']);
  }
  
}
