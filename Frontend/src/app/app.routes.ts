import { Routes } from '@angular/router';
import { NewBookComponent } from './components/new-book/new-book.component';
import { LibraryComponent } from './components/library/library.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'new-book', component: NewBookComponent },  
    { path: 'library', component: LibraryComponent },
    { path: '',   redirectTo: '/library', pathMatch: 'full' },
    {path: '**', component: PageNotFoundComponent}  // must be last one
];
