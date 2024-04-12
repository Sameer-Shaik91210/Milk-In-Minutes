// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  securityCode: string = '';

  constructor(
    private authService: AuthService,
    private routeService: RouteService
  ) {}

  login() {
    // Call login method or handle login logic here
    console.log('Security Code:', this.securityCode);
    // You can replace console.log with your actual login logic

    this.authService.logAdminIn(this.securityCode);
    if (this.authService.isAdmin) {
      this.routeService.navigateToOrderRequests();
    } else {
      alert(`Wrong Credential Entered!!`);
    }
  }
}
