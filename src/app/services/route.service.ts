import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private _router: Router) {}

  navigateToLogin() {
    this._router.navigate(['login']);
  }

  navigateToOrderRequests() {
    this._router.navigate(['dairy-product-requests']);
  }
}
