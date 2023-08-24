import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token: string | undefined;
  constructor(
    private authService: AuthService,
    private router: Router // private toastr: ToastrService
  ) {
    this.token = undefined;
  }
  ngOnInit() {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   this.router.navigate(['']);
    // }
  }
  data: any = {
    email: '',
    password: '',
  };
  login() {
    if (!this.data.email || !this.data.password) {
      // this.toastr.show('Please enter email or password.');
      return;
    }
    this.authService.login(this.data).subscribe(
      (res: any) => {
        if (res.valid == true) {
          this.data = {};

          this.authService.setToken(res.data.user.token);
          // this.toastr.success('Log in successfully');
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        console.log(err);
        // this.toastr.show(err.error.valid);
      }
    );
  }
  public send(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    console.log(`Token [${this.token}] generated`);
  }
}
