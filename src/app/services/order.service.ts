import { Injectable } from '@angular/core';
import { BehaviorSubject,} from 'rxjs';
import { IOrderItem } from '../models/iorderitem';
import { IProduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderItems : IOrderItem[]= [];
  orderItemsSubject = new BehaviorSubject(this.orderItems);
  orderItems$ = this.orderItemsSubject.asObservable();

  private totalPrice=0
  private totalPriceSubject = new BehaviorSubject(0);
  totalPrice$ = this.totalPriceSubject.asObservable()

  calcTotalPrice(item:IProduct, type='add'){
    type ==='add'? this.totalPrice += item.price: this.totalPrice -= item.price;
    this.totalPriceSubject.next(this.totalPrice);
  }

  addItem(item:IOrderItem){
    const orderItem = this.orderItems.find((orderItem)=> orderItem.id === item.id) 
    if (orderItem){
      orderItem.quantity = orderItem.quantity+1;      
    }else {
      item.quantity = 1
      this.orderItems.push(item);
      this.orderItemsSubject.next(this.orderItems);
    }
    this.calcTotalPrice(item);
  }

  removeItem (item:IProduct){
    const orderItem = this.orderItems.find((orderItem)=> orderItem.id === item.id) 
    if (orderItem?.quantity){
      if (orderItem.quantity > 1) orderItem.quantity-- 
      else {
        this.orderItems = this.orderItems.filter((orderItem)=>orderItem.id!==item.id);
        console.log(this.orderItems);
          
      }
    }
    this.orderItemsSubject.next(this.orderItems);
    this.calcTotalPrice(item, 'remove')
  }

  constructor() { }
}
