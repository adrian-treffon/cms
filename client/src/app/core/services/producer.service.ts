import { HttpClient } from '@angular/common/http';
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
}
