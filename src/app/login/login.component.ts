import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _BooksService:BooksService,private _Router:Router){

  }
loginUser=new FormGroup({
  username:new FormControl(),
  password:new FormControl()
});
loginData(x:any){
  console.log(x);
  this._BooksService.loginUser(x.value).subscribe((y)=>{
    console.log(y);
    if(y.error==undefined){
      this._BooksService.isLogined.next(true);
      this._Router.navigate(['/home'])
    }
  })
}
}
