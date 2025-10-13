import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/productService';
import { productEntity } from '../../../core/models/productEntity';
import { MenuService } from '../../services/menuService';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent { 

  constructor(public menu: MenuService){

  }
  
  public home(){
    this.menu.setMenuIndex(0);
  }
  
  public products(){
    this.menu.setMenuIndex(1);
  }
  
  public contact(){
    this.menu.setMenuIndex(2);
  }
}
