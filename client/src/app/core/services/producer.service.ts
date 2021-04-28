import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producer } from '../models/producer';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) { }

  getAll(): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.baseUrl + 'producer');
  }

  add(name: string): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'producer', { name });
  }

  deactivate(id: number): Observable<void> {
    const params = new HttpParams().append('id', id.toString());
    return this.http.delete<void>(this.baseUrl + 'producer', { params });
  }

  activate(id: number): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'producer', id);
  }

  edit(producer: Producer): Observable<void> {
    return this.http.put<void>(this.baseUrl + 'producer/edit', producer);
  }
}
