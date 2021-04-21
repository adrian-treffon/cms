import { HttpClient } from '@angular/common/http';
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
}
