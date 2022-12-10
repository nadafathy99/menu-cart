import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,MatToolbarModule,MatIconModule,MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent{

  categories$= this.categoryService.categories$;
  categoryTypes$ = this.categoryService.categoryTypes$;

  constructor(private categoryService: CategoryService) { }

  categoryChanged(catId:number){
    this.categoryService.selectedCategoryChanged(catId);
  }

  typeChanged(typeId:number){
    this.categoryService.selectedTypeChanged(typeId)

  }
}
