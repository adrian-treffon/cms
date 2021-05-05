import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getAll(status: string): Observable<Order[]> {
    const params = new HttpParams().append('status', status);
    return this.http.get<Order[]>(this.baseUrl + 'order', { params });
  }
}
