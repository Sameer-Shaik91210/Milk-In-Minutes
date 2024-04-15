import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private _router: Router) {}

  navigateToLogin() {
    this._router.navigate(['login']);
  }
  navigateToProducts() {
    this._router.navigate(['products']);
  }

  navigateToOrderRequests() {
    this._router.navigate(['dairy-product-orders']);
  }

  navigateToLoadingErrorPage() {
    this._router.navigate(['error']);
  }
}
