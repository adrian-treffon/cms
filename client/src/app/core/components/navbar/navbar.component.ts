import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  get isAuthenticated() : boolean {return this.accountService.currentUserValue !== null}

  constructor(private readonly accountService: AccountService) { }

  ngOnInit(): void {
  }
  
  logout(): void {
    this.accountService.logout();
  }
}
