import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../services/order.service';
import { IProduct } from '../models/iproduct';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent  {

  orderItems$ = this.orderService.orderItems$;
  totalPrice$ = this.orderService.totalPrice$;
  
  constructor(private orderService:OrderService) { }

  removeItem(item:IProduct) {
    this.orderService.removeItem(item);
  }

}
