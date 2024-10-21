import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private FavoriteItem = new BehaviorSubject<any[]>([]) ;
  private favoriteItemCount = new BehaviorSubject<number>(0) ;
  FavoriteCount$ =  this.favoriteItemCount.asObservable() ;

  isLogined=new BehaviorSubject(false);
  constructor(private _HttpClient:HttpClient,@Inject(PLATFORM_ID) private platformId: Object){

    if(this.getFavoriteItemFromStorage() != null){
      let arrayF =  this.getFavoriteItemFromStorage()  ;
      if(arrayF != null){
        this.FavoriteItem.next(arrayF) ;
        let currentCount = this.FavoriteItem.value.length;
        this.favoriteItemCount.next(currentCount)
      }
      }
  }

  getFavoriteItem():any[]{
    return this.FavoriteItem.value ;
  }

  addToFavorite(item:any){
    const findBook  =  this.FavoriteItem.value.find((p) => p.id  === item.id ) ;
    if(!findBook)
    {
      let  newItem=  [...this.FavoriteItem.value, item] ;
      this.FavoriteItem.next(newItem) ;
      let currentCount = this.FavoriteItem.value.length;
      this.favoriteItemCount.next(currentCount) ;
    }
    this.setFavoriteItemToStorage(this.FavoriteItem.value);
  }

  removeFromFavorite(item:any){
  let newItem =[...this.FavoriteItem.value, item] ;
  newItem = newItem.filter((book) => book.id !== item.id) ;
  this.FavoriteItem.next(newItem) ;
  let currentCount = this.FavoriteItem.value.length;
  this.favoriteItemCount.next(currentCount) ;
  this.setFavoriteItemToStorage(this.FavoriteItem.value);
  }


  // تعديل دالة setFavoriteItemToStorage بحيث يتم استخدام localStorage فقط في المتصفح
  private setFavoriteItemToStorage(favoriteItem: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("favoriteItem", JSON.stringify(favoriteItem));
    }
  }

  // تعديل دالة getFavoriteItemFromStorage بحيث يتم استخدام localStorage فقط في المتصفح
  private getFavoriteItemFromStorage(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      let value = localStorage.getItem("favoriteItem");
      return value ? JSON.parse(value) : [];
    } else {
      return [];  // العودة بمصفوفة فارغة في حال لم يكن في المتصفح
    }
  }

  // private setFavoriteItemToStorage(favoriteItem:any[]){
  //   localStorage.setItem("favoriteItem",JSON.stringify(favoriteItem));
  // }
  // private getFavoriteItemFromStorage():any[]{
  //   let value= localStorage.getItem("favoriteItem");
  //   return value?JSON.parse(value):[];
  // }
getAllcatergory():Observable<any>{
  let res= this._HttpClient.get("https://gutendex.com/books");
  return res;
}
viewDetails(ID:string):Observable<any>{
  let res =  this._HttpClient.get(`https://gutendex.com/books/${ID}`) ;
  return res ;
}
search(ID:string):Observable<any>{
  let res =  this._HttpClient.get(`https://gutendex.com/books/?search=${ID}`) ;
  return res ;
}
loginUser(data:any):Observable<any>{
  let res = this._HttpClient.post('https://dummyjson.com/user/login',data) ;
  return res ;
}

}
