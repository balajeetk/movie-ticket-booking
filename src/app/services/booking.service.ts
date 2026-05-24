import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

export interface BookingSummary {
  movie: Movie;
  seats: string[];
  total: number;
  confirmedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private summary: BookingSummary | null = null;

  confirmBooking(movie: Movie, seats: string[]): void {
    this.summary = {
      movie,
      seats,
      total: seats.length * movie.price,
      confirmedAt: new Date().toLocaleString()
    };
  }

  getSummary(): BookingSummary | null {
    return this.summary;
  }

  clear(): void {
    this.summary = null;
  }
}
