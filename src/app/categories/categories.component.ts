import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink , FormsModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  dataForm: string = "";
  mybook: any[] = [];
  myFavorite: any[] = [];


  constructor(private _BooksService: BooksService) {}

  ngOnInit(): void {
    this._BooksService.getAllcatergory().subscribe((response) => {
        this.categories = response.results;
        console.log(this.categories);

    });
    this.myFavorite = this._BooksService.getFavoriteItem();
  }

  find(book: any): boolean {
    let f = this.myFavorite.find((i) => i.id == book.id);
    return !!f;
  }

  search(data: string) {
    if (data.length >= 2) {
      this._BooksService.search(this.dataForm).subscribe(data => {
        this.mybook = data.results;
      });
    }
  }
  addBookToFavorite(book: any) {
    this._BooksService.addToFavorite(book);
    this.updateItems();
  }

  removeBookToFavorite(book: any) {
    this._BooksService.removeFromFavorite(book);
    this.updateItems();

  }

  updateItems() {
    this.myFavorite = this._BooksService.getFavoriteItem();
  }

}


