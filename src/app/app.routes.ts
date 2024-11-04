import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },  // หน้าแรก
  { path: 'cart', component: CartComponent }  // หน้ารถเข็น
];
