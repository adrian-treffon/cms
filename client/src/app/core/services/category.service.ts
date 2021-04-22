import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'category');
  }

  add(name: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'category', { name });
  }

  deactivate(id: number): Observable<void> {
    const params = new HttpParams().append('id', id.toString());
    return this.http.delete<void>(this.baseUrl + 'category', { params });
  }

  activate(id: number): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'category', id);
  }
}
