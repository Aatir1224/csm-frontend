import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
    private toastr: ToastrService
  ) {
    this.token = undefined;
  }
  ngOnInit() {}
  disableBtn: boolean = false;
  data: any = {
    email: '',
    password: '',
  };

  public send(form: any) {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
    this.disableBtn = true;
    const data = { email: form.value?.email, password: form.value?.password };

    this.authService.login(data).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.data = {};
          console.log(res);

          this.authService.setToken(res.token);
          this.toastr.success('Log in successfully');
          // this.router.navigate(['/dashboard']);
          window.location.href = '/dashboard';
        }
      },
      (err) => {
        this.toastr.show(err.error.error);
        this.disableBtn = false;
      }
    );
  }
}
