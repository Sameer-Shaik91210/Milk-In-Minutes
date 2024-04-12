import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  URL: string = 'http://localhost:3001/orders';

  getOrders(): Observable<order[]> {
    return this.http.get<order[]>(this.URL);
  }

  saveOrder(order: order): Observable<order> {
    return this.http.post<order>(this.URL, order);
  }
}
