import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from '../services/orders.service';
import { dairyProduct } from '../models/dairyProduct';
import { order } from '../models/order';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  isOrderPlaced: boolean = false;

  orderDetails = {};

  ngOnInit() {}
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
    houseNoStreet: ['', Validators.required],
    cityState: ['', Validators.required],
    zipcode: [
      '',
      [Validators.required, Validators.pattern(/^\d{5}(?:\d{1})?$/)],
    ],
    quantity: [0, [Validators.required, Validators.min(1)]],
    totalPrice: [this.productData.price],
  });

  get houseNoStreet() {
    return this.orderForm.get('houseNoStreet');
  }

  get quantity() {
    return this.orderForm.get('quantity');
  }
  get cityState() {
    return this.orderForm.get('cityState');
  }

  get totalPrice() {
    return this.orderForm.get('totalPrice');
  }

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

  ngAfterViewInit(): void {
    this.calculateTotalPrice();
    console.log('total Price', this.orderForm.get('totalPrice')?.value);
  }

  // Calculate Total Price
  calculateTotalPrice() {
    const quantity = this.orderForm.get('quantity')?.value;
    console.log('quantity', quantity);
    const price = this.productData.price;
    console.log('price', price);
    const totalPrice = <number>quantity > 0 ? <number>quantity * price : 0;
    this.orderForm.patchValue({ totalPrice: totalPrice }); // Update totalPrice control value
  }

  onSubmit(): void {
    console.log(this.orderForm.value);
    this.isOrderPlaced = true;
    this.orderStatusEmitter.emit(this.isOrderPlaced);
    this.orderDetails = this.orderForm.value;
    this.saveOrder(this.makeOrderObject(this.productData, this.orderDetails));
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
      quantity: order.quantity,
      totalPrice: order.totalPrice,
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
