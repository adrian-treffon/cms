import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;

  get formControls() { return this.loginForm.controls; }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly accountService: AccountService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if(this.accountService.currentUserValue) this.router.navigate([this.returnUrl]);
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.accountService
      .login(
        this.formControls.username.value,
        this.formControls.password.value
      )
      .subscribe(
        () => {
          this.toastr.success('Zalogowano pomyślnie!');
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.toastr.error('Nieprawidłowy login lub hasło');
        }
      );
  }
}
