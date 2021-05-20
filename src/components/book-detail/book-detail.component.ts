import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../app/book.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  public book: any

  constructor(   
    private route: ActivatedRoute,
    private bookService: BookService,
    private _location: Location,
    ) {}

  ngOnInit() {
    this.bookService
      .findBookById((this.route.snapshot.paramMap.get('id')))
      .subscribe((item) => this.book = item);
  }

  goBack() {
    this._location.back();
  }
}
