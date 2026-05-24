export interface Seat {
  id: string;
  label: string;
  booked: boolean;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  description: string;
  poster: string;
  showtime: string;
  price: number;
  seats: Seat[];
}
