import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAdmin: boolean = false;

  logAdminIn(securityCode: string) {
    //JOE@2024
    if (securityCode === 'JOE@2024') this.isAdmin = true;
  }

  logAdminOut() {
    this.isAdmin = false;
  }
}
