import { Injectable } from '@angular/core';
import { Movie, Seat } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movies: Movie[] = [
    {
      id: '1',
      title: 'Midnight Heist',
      genre: 'Action',
      duration: '2h 10m',
      rating: '8.3',
      description: 'A high stakes thriller where a team of specialists pulls off the impossible bank heist while the clock ticks down.',
      poster: 'assets/midnight-heist.svg',
      showtime: '7:30 PM',
      price: 12,
      seats: this.createSeatMap()
    },
    {
      id: '2',
      title: 'Sunset Memories',
      genre: 'Drama',
      duration: '1h 55m',
      rating: '7.9',
      description: 'A moving story of family, forgiveness, and a summer that changes everything.',
      poster: 'assets/sunset-memories.svg',
      showtime: '5:15 PM',
      price: 11,
      seats: this.createSeatMap()
    },
    {
      id: '3',
      title: 'Galactic Drift',
      genre: 'Sci-Fi',
      duration: '2h 25m',
      rating: '8.7',
      description: 'The crew of a drifting starship must survive a dangerous nebula and a mysterious alien presence.',
      poster: 'assets/galactic-drift.svg',
      showtime: '9:00 PM',
      price: 13,
      seats: this.createSeatMap()
    },
    {
      id: '4',
      title: 'Comedy Nights',
      genre: 'Comedy',
      duration: '1h 40m',
      rating: '7.4',
      description: 'A laugh-out-loud ensemble comedy with surprises around every corner.',
      poster: 'assets/comedy-nights.svg',
      showtime: '6:00 PM',
      price: 10,
      seats: this.createSeatMap()
    }
  ];

  getMovies(): Movie[] {
    return this.movies.map((movie) => ({ ...movie, seats: [...movie.seats] }));
  }

  getMovieById(id: string): Movie | undefined {
    const movie = this.movies.find((item) => item.id === id);
    return movie ? { ...movie, seats: [...movie.seats] } : undefined;
  }

  bookSeats(movieId: string, seatIds: string[]): void {
    const movie = this.movies.find((item) => item.id === movieId);
    if (!movie) {
      return;
    }

    movie.seats = movie.seats.map((seat) => ({
      ...seat,
      booked: seat.booked || seatIds.includes(seat.id)
    }));
  }

  private createSeatMap(): Seat[] {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const cols = 6;

    rows.forEach((row) => {
      for (let col = 1; col <= cols; col++) {
        seats.push({
          id: `${row}${col}`,
          label: `${row}${col}`,
          booked: false
        });
      }
    });

    return seats;
  }
}
