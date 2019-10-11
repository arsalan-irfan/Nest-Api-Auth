import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  pwd = new FormControl();
  email = new FormControl();
  error: any;

  async onFormSubmit() {
    let password = this.pwd.value;
    let email = this.email.value;

    let authUser = { email, password };
    await this.authService.signIn(authUser).subscribe(async authRes => {
      console.log('Status Code: ' + authRes.statusCode);
      if (authRes.statusCode == 401) {
        this.setAlert('Invalid Email Password', 'danger');
      } else {
        console.log(authRes);
        localStorage.setItem('token', authRes.access_token);
        this.getUserProfile();
      }
    });
  }

  async getUserProfile() {
    await this.authService.getUser().subscribe(userData => {
      console.log('UserData: ' + userData);
      this.protectedRoute();
    });
  }
  async setAlert(msg, type) {
    this.error = { msg, type };
    await setTimeout(() => {
      this.error = null;
    }, 3000);
  }

  protectedRoute(): void {
    if (this.authService.isAuthenticate) this.location.go('/todos');
  }
  constructor(private authService: AuthService, private location: Location) {}

  ngOnInit() {
    if (this.authService.isAuthenticate) {
      this.protectedRoute();
    } else {
      if (localStorage.getItem('token')) {
        this.getUserProfile();
        console.log('hello');
      }
    }
  }
}
