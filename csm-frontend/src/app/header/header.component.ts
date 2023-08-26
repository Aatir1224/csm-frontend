import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUserDetails();
  }
  logOut() {
    this.authService.logout().subscribe((res: any) => {
      if (res.status === 'success') {
        this.toastr.show('Logged Out Successfully');
        this.router.navigate(['/']);
      }
    });
  }
  user: any = {};
  getUserDetails() {
    this.authService.getUserDetails().subscribe((res: any) => {
      this.user = res.user;
    });
  }
}
