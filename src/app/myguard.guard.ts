import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { BooksService } from './books.service';
import { Router } from '@angular/router';

export const myguardGuard: CanActivateFn = (route, state) => {
  let booksService=inject(BooksService);
  let router=inject(Router);
  if(booksService.isLogined.getValue()==true){
    return true;
  }else{
    router.navigate(["/login"]);
  return false;
  }
};
