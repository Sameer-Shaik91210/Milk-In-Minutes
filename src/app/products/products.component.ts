import { Component } from '@angular/core';
import { DairyService } from '../services/dairy.service';
import { dairyProduct } from '../models/dairyProduct';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(
    private dairyService: DairyService,
    private routeService: RouteService
  ) {}

  noResults: boolean = false;
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
        this.routeService.navigateToLoadingErrorPage();

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
    console.log('onSearch of home component is getting executed!');

    if (searchText === '') {
      this.tempProducts = this.dairyProducts;
    } else {
      let filteredProducts = this.dairyProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase())
      );

      if (filteredProducts.length === 0) {
        this.tempProducts = filteredProducts;
        this.noResults = true;
      } else {
        this.tempProducts = filteredProducts;
        this.noResults = false;
      }
    }
  }
}
