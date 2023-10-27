import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})

export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: any[] = []; // You might want to specify a more specific type for favoriteMovies

  constructor(
    private fetchApiData: FetchApiDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Retrieve the username from the route parameters
    const username = this.route.snapshot.paramMap.get('username');
  
    if (username !== null) {
      // Call the getFavoriteMovies function to fetch the user's favorite movies
      this.fetchApiData.getFavoriteMovies(username).subscribe(
        (data) => {
          this.favoriteMovies = data;
        },
        (error) => {
          console.error('Error fetching favorite movies:', error);
        }
      );
    } else {
      console.error('Error: Username is null.');
    }
  }
  

  // Check if a movie is a favorite for the current user
  isFavoriteMovie(movieId: string): boolean {
    return this.fetchApiData.isFavoriteMovie(movieId);
  }
}
