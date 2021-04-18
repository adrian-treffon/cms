import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ProductEnvelope } from 'src/app/core/models/productEnvelope';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) { }

  getAll(limit?: number,
    offset?: number,
    orderBy?: string,
    isDescending?: boolean,
    filterBy?: string,
    searchedPhrase?: string): Observable<ProductEnvelope> {
    let params = new HttpParams();
    if (limit) { params = params.append('limit', limit.toString()); }
    if (offset) { params = params.append('offset', offset.toString()); }
    if (orderBy) { params = params.append('orderBy', orderBy); }
    if (isDescending) { params = params.append('isDescending', isDescending.toString()); }
    if (filterBy) { params = params.append('filterBy', filterBy); }
    if (searchedPhrase) { params = params.append('searchedPhrase', searchedPhrase); }

    return this.http.get<ProductEnvelope>(this.baseUrl + 'product', { params });
  }

  create(product: Product): Observable<any> {
   return this.http.post(this.baseUrl + 'product', product);
  }

  edit(product: Product): Observable<any> {
    return this.http.put(this.baseUrl + 'product', product);
   }

   getById(productId: string): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + 'product/' + productId);
   }
}
