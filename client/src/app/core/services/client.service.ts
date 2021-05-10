import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'client');
  }
}
