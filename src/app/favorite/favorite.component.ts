import { Component } from '@angular/core';
import { BooksService } from '../books.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent {
  myFavoriteItems:any[] =[] ;
  mode!:boolean ;
  logined!:boolean ;
  delete!:boolean ;

  constructor(private _BooksService:BooksService){
  }

  ngOnInit(): void {
    this.myFavoriteItems = this._BooksService.getFavoriteItem() ;
  }

  removeBookToFavorite(book:any){
      this._BooksService.removeFromFavorite(book) ;
      this.updateItems();
  }

  updateItems() {
    this.myFavoriteItems = this._BooksService.getFavoriteItem();
  }
}
