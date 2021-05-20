import { Component, OnInit } from '@angular/core';
import {  FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { debounceTime, tap, switchMap, finalize, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/book.service';
import { Book } from 'src/model/book';

@Component({
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  apiRoot = 'https://www.googleapis.com/books/v1/volumes';
  books: Observable<Book[]>;
  searchBookCtrl = new FormControl();
  filteredBooks: any;
  isLoading = false;
  errorMsg: string;

  constructor(
    private http: HttpClient, private bookService: BookService, private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit() {
    this.searchBookCtrl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = true;
        }),
        switchMap((value) => this.bookService.getBooks(value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe(data => {
        console.log(data);
        this.filteredBooks = data['items'];
      });
  }

  displayFn(book?: String | undefined) {
    console.log(book);
    return book ? book['volumeInfo']['title'] : undefined;
  }

  bookDetails(id: Number) {
    console.log(id);
    this.router.navigateByUrl('searchBookById/' + id);
  }

}
