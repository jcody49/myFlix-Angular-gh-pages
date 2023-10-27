import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = []; // This is where the movies returned from the API call will be kept
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
  }

  /**
   * Fetches all movies from the API and sets the value of this.movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      return this.movies;
    });
  }

  /**
   * Opens a dialog to display movie genre information.
   * @param genre - The genre object to display.
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    })
  }

  /**
   * Opens a dialog to display the movie's synopsis.
   * @param synopsis - The movie's synopsis to display.
   */
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: "Description",
        content: synopsis,
      }
    })
  }

  /**
   * Opens a dialog to display information about the movie's director.
   * @param director - The director object to display.
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      }
    })
  }
  
  /**
   * Checks if a movie is in the user's favorites.
   * @param id - The movie's ID.
   * @returns `true` if the movie is a favorite; otherwise, `false`.
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id) 
  }

  /**
   * calls the deleteFavoriteMovie api and shows the snackbar if successful
   * @param id the movie id
  */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }

  /**
   * Calls the API to add a movie to the user's favorites and shows a snackbar if successful.
   * @param id - The movie's ID.
   */
  addFavorite(id: string): void {
    console.log('id: ', id)
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('added to favorites', 'OK', {
        duration: 2000
      })
    });
  } 
}


