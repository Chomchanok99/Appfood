import { Component } from '@angular/core';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  products: Product[] = [
    // Appetizers
    new Product('A1', 'Chicken Wings', 59, 'UI/Appetizers/Chicken_Wings.png', 'Appetizers', 50),
    new Product('A2', 'Cheese Balls', 49, 'UI/Appetizers/Cheese_Balls.png', 'Appetizers', 50),
    new Product('A3', 'French Fries', 55, 'UI/Appetizers/French_Fires.png', 'Appetizers', 50),
    new Product('A4', 'Spinach & Cheese Bake', 69, 'UI/Appetizers/Spinach_and_Cheese_Bake.png', 'Appetizers', 50),
      
    // Main Courses
    new Product('B1', 'Beef Steak', 299, 'UI/Main Courses/Beef_Steak.png', 'Main Courses', 50),
    new Product('B2', 'Spaghetti Carbonara', 179, 'UI/Main Courses/Spaghetti_Carbonara.png', 'Main Courses', 50),
    new Product('B3', 'Carb Meat Fried Rice', 239, 'UI/Main Courses/Carb_Meat_Fried_Rice.png', 'Main Courses', 50),
    new Product('B4', 'Tom Yum Goong', 269, 'UI/Main Courses/Tom_Yum_Goong.png', 'Main Courses', 50),
  
    // Beverages
    new Product('C1', 'Thai Tea', 50, 'UI/Beverages/Thai_Tea.png', 'Beverages', 50),
    new Product('C2', 'Latte', 65, 'UI/Beverages/Latte.png', 'Beverages', 50),
    new Product('C3', 'Strawberry Italian Soda', 60, 'UI/Beverages/Strawberry_Italian_Soda.png', 'Beverages', 50),
    new Product('C4', 'Ice Chocolate', 65, 'UI/Beverages/Ice_Chocolate.png', 'Beverages', 50),
  
    // Desserts
    new Product('D1', 'Chocolate Lava Cake', 119, 'UI/Desserts/Chocolate_Lava_Cake.png', 'Desserts', 50),
    new Product('D2', 'Strawberry Bingsu', 129, 'UI/Desserts/Strawberry_Bingsu.png', 'Desserts', 50),
    new Product('D3', 'Mixed Berry Pan Cake', 99, 'UI/Desserts/Mixed_Berry_Pan_Cake.png', 'Desserts', 50),
    new Product('D4', 'Croissant', 40, 'UI/Desserts/Croissant.png', 'Desserts', 50),
  ];

  groupedProducts: { [key: string]: Product[] } = this.products.reduce((acc: { [key: string]: Product[] }, product: Product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    acc[product.category] = acc[product.category].sort((a, b) => a.id.localeCompare(b.id)); // จัดเรียงสินค้าในแต่ละหมวดหมู่ตาม ID
    return acc;
  }, {} as { [key: string]: Product[] });

  categoryOrder: string[] = ['Appetizers', 'Main Courses', 'Beverages', 'Desserts'];
  getOrderedCategories() {
    return Object.keys(this.groupedProducts).sort((a, b) => this.categoryOrder.indexOf(a) - this.categoryOrder.indexOf(b));
  }

  scrollToCategory(category: string) {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' }); // เลื่อนแบบ smooth
    }
  }

  cartItems: Product[] = [];

  constructor() {
    this.loadCartItemsFromLocalStorage(); 
  }

  loadCartItemsFromLocalStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.saveCartItemsToLocalStorage();
    this.updateCartCount();
  }

  saveCartItemsToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  updateCartCount() {
    const cartIcon = document.getElementById('cart-count');
    if (cartIcon) {
      cartIcon.innerText = this.cartItems.length.toString();
    }
  }
}