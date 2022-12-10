import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay, Subject, tap } from 'rxjs';
import { ICategory } from '../models/icategory';
import { ICType } from '../models/ictype';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  initTypesId :number[]=[];

  categories$= this.http.get<ICategory[]>('assets/data/categories.json');
  categoriesTypes$ = this.http.get<ICType[]>('assets/data/cat-types.json').pipe(
    shareReplay(1),
  );


  private selectedCategorySubject = new BehaviorSubject<number>(1);
  selectedCategoryAction$ = this.selectedCategorySubject.asObservable();
  
  categoryTypes$ = combineLatest([this.categoriesTypes$, this.selectedCategoryAction$]).pipe(
    // tap(([categoriesTypes, selectedCategoryId])=>console.log(categoriesTypes, selectedCategoryId)),
    map(([categoriesTypes, selectedCategoryId])=>
    categoriesTypes.filter((categoriesType)=> 
    categoriesType.catId === selectedCategoryId
    )),
    
    tap((categoriesType)=>{
      this.initTypesId = categoriesType.map((catType)=> catType.id);
      this.selectedTypesSubject.next(this.initTypesId);
    }),

    shareReplay(1),
  )

  private selectedTypesSubject = new Subject()
  selectedTypesAction$ = this.selectedTypesSubject.asObservable();

  constructor(private http:HttpClient) { }

  selectedCategoryChanged(catId:number){
    this.selectedCategorySubject.next(catId);
  }

  selectedTypeChanged(typeId:number){
    this.selectedTypesSubject.next(typeId);
  }

}
