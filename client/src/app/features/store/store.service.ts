import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductEnvelope } from 'src/app/core/models/productEnvelope';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) { }

  getAll(limit?: number, offset?: number, orderBy?: string, isDescending?: boolean): Observable<ProductEnvelope> {
    let params = new HttpParams();
    if (limit) { params = params.append('limit', limit.toString()); }
    if (offset) { params = params.append('offset', offset.toString()); }
    if (orderBy) { params = params.append('orderBy', orderBy); }
    if (isDescending) { params = params.append('isDescending', isDescending.toString()); }

    return this.http.get<ProductEnvelope>(this.baseUrl + 'product', { params });
  }
}
