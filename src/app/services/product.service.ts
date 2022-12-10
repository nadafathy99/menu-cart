import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, shareReplay, tap } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products$ = this.http.get<IProduct[]>('assets/data/products.json').pipe(
    shareReplay()
  )

  selectedTypesAction$ = this.categoryService.selectedTypesAction$;

  selectedProducts$ = combineLatest([this.products$, this.selectedTypesAction$]).pipe(
    tap(([products, catTypeId])=>console.log(products, catTypeId)),
    map(([products, catTypeId])=> {
      if (Array.isArray(catTypeId)) return products.filter((product)=> catTypeId.includes(product.typeId));
      else return products.filter((product)=>product.typeId === catTypeId);
    }
    )
  )

  constructor(private http:HttpClient, private categoryService:CategoryService) { }
}
