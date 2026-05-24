import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BookingService, BookingSummary } from '../services/booking.service';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent {
  booking: BookingSummary | null;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/']);
      this.booking = null;
      return;
    }

    this.booking = this.bookingService.getSummary();
    if (!this.booking) {
      this.router.navigate(['/movies']);
    }
  }

  startNewBooking(): void {
    this.bookingService.clear();
    this.router.navigate(['/movies']);
  }
}
