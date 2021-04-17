import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.busyService.busy();
    return timer(0).pipe(
      switchMap(() => next.handle(request)),
      finalize(() => this.busyService.idle()) 
    );
  }
}
