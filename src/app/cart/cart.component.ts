import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() cartUpdated = new EventEmitter<number>(); 
  cartItems: Product[] = [];

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.loadCartItemsFromLocalStorage(); 
    this.updateCartCount(); 
  }

  loadCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.updateCartCount(); 
    }
  }

  clearCart() {
    this.cartItems = []; 
    localStorage.removeItem('cartItems');
    this.updateCartCount();
  }

  updateCartCount() {
    const total = this.totalQuantity(); 
    this.cartUpdated.emit(total); 
    localStorage.setItem('totalQuantity', JSON.stringify(total));
  }

  confirmCart() {
    alert('All items confirmed!');
  }

  removeItem(index: number): void {
    if (index > -1 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.updateCartCount(); 
    }
  }

  incrementQuantity(index: number): void {
    this.cartItems[index].quantity += 1;
    this.updateCart(); 
  }
  
  decrementQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.updateCart(); 
    }
  }
  
  updateCart(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.updateCartCount(); 
  }

  totalQuantity(): number {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }
  
  totalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
