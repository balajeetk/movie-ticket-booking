import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieBookingComponent } from './movie-booking/movie-booking.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';

export const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'booking/:id', component: MovieBookingComponent },
  { path: 'summary', component: BookingSummaryComponent },
  { path: '**', redirectTo: '' }
];
