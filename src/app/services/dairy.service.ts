import { Injectable } from '@angular/core';
import { dairyProduct } from '../models/dairyProduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DairyService {
  constructor(private http: HttpClient) {}

  URL: string = 'http://localhost:3000/dairyProducts';

  getProducts(): Observable<dairyProduct[]> {
    return this.http.get<dairyProduct[]>(this.URL);
  }

  getProduct(id: number): Observable<dairyProduct> {
    return this.http.get<dairyProduct>(`${this.URL}/${id}`);
  }
}
