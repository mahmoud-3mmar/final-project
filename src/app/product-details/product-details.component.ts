import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  details!:any;
  id:any;
  constructor(private _BooksService:BooksService ,private route:ActivatedRoute)
  {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ;
    this._BooksService.viewDetails(this.id).subscribe((data) => {
      this.details = data;
    })
  }
}
