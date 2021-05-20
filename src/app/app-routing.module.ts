import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from '../components/books/books.component';
import { BookDetailComponent } from '../components/book-detail/book-detail.component';

const routes: Routes = [
    {path: '' , component: BooksComponent},
    {path: 'searchBookById/:id', component: BookDetailComponent},
    {path: '**', component: BooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }