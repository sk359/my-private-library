import { Component, Input, Output, EventEmitter } from '@angular/core';

type SortOrder = 'asc' | 'desc';

@Component({
  selector: 'app-sort-icons',
  standalone: true,
  imports: [],
  templateUrl: './sort-icons.component.html',
  styleUrl: './sort-icons.component.scss'
})
export class SortIconsComponent {  

  @Input()
  isActive = false;

  @Input()
  order: SortOrder = 'asc';

  @Output() sortOrderChanged = new EventEmitter<{order: SortOrder}>();

  toggleDirection() {
    if (!this.isActive) {
      // Do not toggle on activation:      
      this.sortOrderChanged.emit({order: this.order});
    } else {      
      this.order = this.order === 'asc' ? 'desc' : 'asc';
      this.sortOrderChanged.emit({order: this.order});
    }
    this.isActive = true;
  }

  showDescIcon(): boolean {
    return this.order === 'desc';
  }

  showAscIcon(): boolean {
    return this.order === 'asc';
  }

}
