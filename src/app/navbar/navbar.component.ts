import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  logined:any;
  constructor(private _BooksService:BooksService,private _Router:Router){

  }
  ngOnInit(): void {
    this._BooksService.isLogined.subscribe((x)=>{
      this.logined=x;
      console.log(this.logined);
    });
  }
  logOut(){
    this._BooksService.isLogined.next(false);
    this._Router.navigate(['/login'])
  }
searchText:any;

}
