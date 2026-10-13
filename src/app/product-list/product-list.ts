import { Component } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  likes: number;
}

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html'
})
export class ProductList {
  products: Product[] = [
    { id: 1, name: 'Laptop',     price: 1200, quantity: 5,  likes: 0 },
    { id: 2, name: 'Phone',      price: 800,  quantity: 10, likes: 0 },
    { id: 3, name: 'Headphones', price: 150,  quantity: 3,  likes: 0 }
  ];

  like(p: Product) {
    p.likes++;
  }

  buy(p: Product) {
    if (p.quantity > 0) p.quantity--;
  }
}