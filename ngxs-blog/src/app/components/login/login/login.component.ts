import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  username: string = '';
  password: string = '';
  show: boolean = false;
  submit() {
    axios
      .post('http://localhost:1337/api/auth/local', {
        identifier: this.username,
        password: this.password,
      })
      .then((response) => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        this.router.navigate(['./home']);
      })

      .catch((error) => {
        const errorMessage = error.response.data.error.message;
        this.snackBar.open(errorMessage, 'ERROR', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
        });
      });

    this.clear();
  }
  clear() {
    this.username = '';
    this.password = '';
    this.show = true;
  }

  ngOnInit(): void {}
}
