import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from '../services/orders.service';
import { dairyProduct } from '../models/dairyProduct';
import { order } from '../models/order';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent {
  ngOnInit(): void {}

  isOrderPlaced: boolean = false;
  totalPrice: number = 0;
  quantity: number = 1;

  orderDetails = {};

  @Input()
  productData: dairyProduct = {
    id: 0,
    productName: '',
    category: '',
    price: 0,
    imagePath: '',
    description: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ordersService: OrdersService
  ) {}

  @Output()
  orderStatusEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  orderForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^[7-9]\d{9}$/)]],
    houseNoStreet: [''],
    cityState: [''],
    zipcode: ['', [Validators.pattern(/^\d{5}(?:\d{1})?$/)]],
    quantity: [1, Validators.min(1)],
  });

  get name() {
    return this.orderForm.get('name');
  }

  get email() {
    return this.orderForm.get('email');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get zipcode() {
    return this.orderForm.get('zipcode');
  }

  // Increment quantity
  incrementQuantity() {
    this.quantity++;
    this.calculateTotalPrice();
  }

  // Decrement quantity
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotalPrice();
    }
  }

  // Calculate total price
  calculateTotalPrice() {
    this.totalPrice = this.quantity * this.productData.price;
  }

  onSubmit(): void {
    console.log(this.orderForm.value);
    this.orderStatusEmitter.emit(this.isOrderPlaced);
    this.isOrderPlaced = true;
    this.orderDetails = this.orderForm.value;
    this.saveOrder(this.makeOrderObject(this.productData, this.orderDetails));
    this.orderForm.reset();
  }

  makeOrderObject(product: dairyProduct, order: any): order {
    return {
      productName: product.productName,
      productPrice: product.price,
      productCategory: product.category,
      name: order.name,
      phone: order.phone,
      email: order.email,
      houseNoStreet: order.houseNoStreet,
      cityState: order.cityState,
      zipcode: order.zipcode,
      quantity: this.quantity,
    };
  }

  saveOrder(order: order) {
    this._ordersService.saveOrder(order).subscribe({
      next: (data) => {
        this._snackBar.open('Congrats!! Your order is placed!!', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary'],
        });
        console.log('latest Order details', data);
      },
      error: (err) => {
        alert(`Error while saving the order! ${err.error}`);
      },
    });
  }
}
