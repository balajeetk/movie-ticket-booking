import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';
import { Movie, Seat } from '../models/movie.model';

@Component({
  selector: 'app-movie-booking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-booking.component.html',
  styleUrls: ['./movie-booking.component.css']
})
export class MovieBookingComponent implements OnInit {
  movie: Movie | undefined;
  selectedSeats = new Set<string>();
  seatsPerRow = 6;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }

    const movieId = this.route.snapshot.paramMap.get('id');
    if (!movieId) {
      this.router.navigate(['/movies']);
      return;
    }

    this.movie = this.movieService.getMovieById(movieId);
    if (!this.movie) {
      this.router.navigate(['/movies']);
      return;
    }
  }

  get seatRows(): Seat[][] {
    if (!this.movie) {
      return [];
    }

    const rows: Seat[][] = [];
    for (let i = 0; i < this.movie.seats.length; i += this.seatsPerRow) {
      rows.push(this.movie.seats.slice(i, i + this.seatsPerRow));
    }

    return rows;
  }

  get totalPrice(): number {
    return this.movie ? this.selectedSeats.size * this.movie.price : 0;
  }

  toggleSeat(seat: Seat): void {
    if (seat.booked) {
      return;
    }

    if (this.selectedSeats.has(seat.id)) {
      this.selectedSeats.delete(seat.id);
    } else {
      this.selectedSeats.add(seat.id);
    }
  }

  confirmBooking(): void {
    if (!this.movie || this.selectedSeats.size === 0) {
      return;
    }

    const seats = Array.from(this.selectedSeats);
    this.movieService.bookSeats(this.movie.id, seats);
    this.bookingService.confirmBooking(this.movie, seats);

    this.router.navigate(['/summary']);
  }
}
