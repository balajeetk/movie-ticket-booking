import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  search = '';
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }

    this.movies = this.movieService.getMovies();
  }

  get filteredMovies(): Movie[] {
    const query = this.search.trim().toLowerCase();
    if (!query) {
      return this.movies;
    }

    return this.movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query)
      );
    });
  }
}
