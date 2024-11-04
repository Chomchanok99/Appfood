import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
  cartCount!: number; 

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTotalQuantityFromLocalStorage();
  }

  loadTotalQuantityFromLocalStorage() {
    const totalQuantity = localStorage.getItem('totalQuantity');
    this.cartCount = totalQuantity ? JSON.parse(totalQuantity) : 0;
  }

  updateCartCount(total: number) {
    this.cartCount = total;
    localStorage.setItem('totalQuantity', JSON.stringify(total));
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  isCartPage(): boolean {
    return this.router.url === '/cart';
  }
}
