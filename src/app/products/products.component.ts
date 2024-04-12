import { Component } from '@angular/core';
import { DairyService } from '../services/dairy.service';
import { dairyProduct } from '../models/dairyProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private dairyService: DairyService) {}

  dairyProducts: Array<dairyProduct> = [];
  tempProducts: Array<dairyProduct> = this.dairyProducts;

  selectedValue: string = '';

  ngOnInit(): void {
    this.dairyService.getProducts().subscribe({
      next: (data) => {
        this.dairyProducts = data;
        this.tempProducts = this.dairyProducts;
        console.log(this.dairyProducts);
      },
      error: (err: any) => {
        alert(`Error fetching details!${err}`);
      },
    });
  }

  onSelectingCategory(eventData: any) {
    this.selectedValue = eventData;
    this.tempProducts =
      this.selectedValue.toLocaleLowerCase() == 'all'
        ? this.dairyProducts
        : this.dairyProducts.filter(
            (product) => product.category === this.selectedValue
          );
  }

  onSearch(searchText: any) {
    console.log('onSearch of home coponent is getting executed!');
    this.tempProducts =
      searchText === ''
        ? this.dairyProducts
        : this.dairyProducts.filter((product) =>
            product.productName
              .toLowerCase()
              .startsWith(searchText.toLowerCase())
          );
  }
}
