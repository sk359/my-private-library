import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  // Observable string sources
  private newBookCreatedSource = new Subject<string>();
  
  // Observable string streams
  newBookCreate$ = this.newBookCreatedSource.asObservable();
  
  // Service message commands
  announceBookCreated() {
    console.log("NEXT");
    this.newBookCreatedSource.next("");
  }
  
}
