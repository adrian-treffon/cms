import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [LoginComponent, SidenavComponent, NavbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [SidenavComponent, NavbarComponent],
})
export class CoreModule {}
