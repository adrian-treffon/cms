import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public get isOpen() : boolean {
    if(this.accountService.currentUserValue) return true;
    else return false;
  }

  constructor(private readonly accountService: AccountService) { }

  ngOnInit(): void {
  }

}
