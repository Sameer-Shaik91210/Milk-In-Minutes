import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input()
  id: number = 0;

  @Input()
  productName: string = '';

  @Input()
  imagePath: string = '';

  @Input()
  price: number = 0;

  @Input()
  category: string = '';

  @Input()
  description: string = '';

  @Input()
  isItOrderView: boolean = false;
}
