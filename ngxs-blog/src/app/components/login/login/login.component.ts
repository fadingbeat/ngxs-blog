import { MatLegacySnackBar } from '@angular/material/legacy-snack-bar';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  private loginSub: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private ss: StorageService,
    private snackBar: MatLegacySnackBar
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  login() {
    const credentials = this.loginForm.value;

    this.loginSub = this.auth
      .login(credentials.email!, credentials.password!)
      .subscribe(
        (resp) => {
          this.loginForm.reset();

          this.auth.persistUser(resp);

          this.snackBar.open('Successfully logged in', 'SUCCESS', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });

          const attemptedRoute = this.ss.getItem('attemptedRoute');
          this.ss.removeItem('attemptedRoute');
          this.router.navigateByUrl(attemptedRoute || 'home');
        },
        (error) => {
          const errorMessage = error.error.error.message;

          this.snackBar.open(errorMessage, 'ERROR', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
          });
        }
      );
  }
}
