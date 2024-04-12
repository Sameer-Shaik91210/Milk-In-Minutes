import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DairyService } from '../services/dairy.service';
import { dairyProduct } from '../models/dairyProduct';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css',
})
export class OrderViewComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private dairyService: DairyService
  ) {}

  isOrderPlaced: boolean = false;
  dairyProduct: dairyProduct = {
    id: 0,
    productName: '',
    category: '',
    price: 0,
    imagePath: '',
    description: '',
  };

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (data) => {
        let id = data.get('id') ?? 0;
        this.dairyService.getProduct(+id).subscribe({
          next: (data) => {
            this.isOrderPlaced = false;
            this.dairyProduct = data;
          },
          error: (err) => {},
        });
      },
    });
  }

  canDeactivate() {
    if (!this.isOrderPlaced) {
      return (this.isOrderPlaced = confirm(
        'This page has unsaved changes.Are you sure ,you want to leave?Click Ok .Else ,click Cancel.'
      ));
    } else return this.isOrderPlaced;
  }

  onOrder(isOrderPlaced: boolean) {
    this.isOrderPlaced = isOrderPlaced;
  }
}
