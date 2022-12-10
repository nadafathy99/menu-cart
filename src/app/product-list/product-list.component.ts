import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { tap } from 'rxjs';
import { OrderService } from '../services/order.service';
import { IProduct } from '../models/iproduct';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  products$ = this.productService.selectedProducts$.pipe(
    tap((p)=>console.log(p))
  )

  constructor(private productService: ProductService, private orderService: OrderService) { }

  addItem(item:any){
    this.orderService.addItem(item)
  }

}
