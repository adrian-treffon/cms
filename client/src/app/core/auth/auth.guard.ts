import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private readonly accountService: AccountService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.accountService.currentUserValue;
    if (currentUser) return true;
    
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
}
