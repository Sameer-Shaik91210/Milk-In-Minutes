import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { order } from '../models/order';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-dairy-product-requests',
  templateUrl: './dairy-product-requests.component.html',
  styleUrls: ['./dairy-product-requests.component.css'],
})
export class DairyProductRequestsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private _ordersService: OrdersService
  ) {}

  allOrders: order[] = [];
  displayedColumns: string[] = [
    'productName',
    'productPrice',
    'productCategory',
    'customerName',
    'phone',
    'email',
    'houseNo',
    'street',
    'city',
    'state',
    'zipcode',
  ];

  ngOnInit(): void {
    this._ordersService.getOrders().subscribe({
      next: (data) => {
        this.allOrders = data;
        console.log('Orders fetching successful!', this.allOrders);
      },
      error: (err) => {
        alert(`Error while fetching orders data: ${err}`);
      },
    });
  }
}
