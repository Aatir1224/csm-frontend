import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  data: any = { fullName: '', email: '', password: '' };
  disableBtn: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit() {}

  signup() {
    this.disableBtn = true;
    this.authService.register(this.data).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.toaster.show('Successfully Signed Up');
          this.router.navigate(['/']);
        }
      },
      (err) => {
        this.toaster.show(err.error.error);
        this.disableBtn = false;
      }
    );
  }
}
