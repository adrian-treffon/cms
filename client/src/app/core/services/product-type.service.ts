import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductType } from '../models/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(this.baseUrl + 'productType');
  }

  add(name: string, parameters: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'productType', { name, parameters});
  }

  deactivate(id: number): Observable<void> {
    const params = new HttpParams().append('id', id.toString());
    return this.http.delete<void>(this.baseUrl + 'productType', { params });
  }

  activate(id: number): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'productType', id);
  }
}
