import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../core/nav-bar/nav-bar.component';
import { ProductService } from '../services/product.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule,NavBarComponent, ProductListComponent, OrderDetailComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
  }

}
