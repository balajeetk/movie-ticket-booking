import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'movie-ticket-booking-authenticated';
  isAuthenticated = false;

  constructor() {
    this.isAuthenticated = localStorage.getItem(this.storageKey) === 'true';
  }

  login(email: string, password: string): boolean {
    if (!email || !password) {
      return false;
    }

    localStorage.setItem(this.storageKey, 'true');
    this.isAuthenticated = true;
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.isAuthenticated = false;
  }
}
