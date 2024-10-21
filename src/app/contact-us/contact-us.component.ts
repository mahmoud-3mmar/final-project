import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-contact-us',
  standalone:true,
  imports:[CommonModule ,ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  constructor(private _Router: Router,private _booksService:BooksService) {}
  registerForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10),
    Validators.pattern(/^[A-Z]/)]),
    lastName: new FormControl(),
    age: new FormControl(),
    email: new FormControl(),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')  
    ])
  });



  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this._Router.navigate(['/login']);
    } else {
      this.registerForm.markAllAsTouched(); 
    }
  }
}
