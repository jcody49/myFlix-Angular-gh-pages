import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = []; // This is where the movies returned from the API call will be kept
  constructor(public fetchApiData: FetchApiDataService) { } // injecting FetchApiDataService

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void { //used to fetch the movies from the FetchApiDataService service
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}