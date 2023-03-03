import { MatLegacySnackBar } from '@angular/material/legacy-snack-bar';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  avatarInitial = '';
  username = '';
  authStatus!: Subscription;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: MatLegacySnackBar
  ) {}

  ngOnInit(): void {
    this.authStatus = this.auth.loggedInStatus$.subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        this.username = this.auth.getPersistedUser().username;
        this.avatarInitial = this.username[0] || 'you';
      }
    });
  }

  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.snackBar.open('Successfully logged out', 'SUCCESS', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
    // this.toast.showSuccess('Successfully logged out.');
    this.router.navigateByUrl('/');
  }
}
