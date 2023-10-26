import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { map } from 'rxjs/operators';

const apiUrl = 'https://myflixmovieapp-3df5d197457c.herokuapp.com/';

export type User = { _id?: string, Username?: string, Password?: string, Email?: string, FavoriteMovies?: string[] };

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * 
   * @param http 
   */
  constructor(private http: HttpClient) {}

  /**
   * Sends a user's registration details to the server.
   * @param userDetails - An object containing user registration data.
   * @returns An observable representing the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param userDetails 
   * @returns 
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login?' + new URLSearchParams(userDetails), {}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of all movies from the server.
   *
   * @returns An observable that emits the array of movies or an error in case of failure.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves detailed information about a specific movie by its title.
   *
   * @param title - The title of the movie to retrieve.
   * @returns An observable that emits the movie details or an error if the movie is not found.
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves detailed information about a director by their name.
   * 
   * @param directorName 
   * @returns An observable that emits the director's details or an error if the director is not found.
   */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a list of movies associated with a specific genre by its name.
   *
   * @param genreName - The name of the genre to retrieve movies for.
   * @returns An observable that emits an array of movies or an error if no movies are found for the genre.
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves user information by their username from local storage.
   *
   * @param username - The username of the user to retrieve.
   * @returns The user object obtained from local storage.
   */
  getOneUser(username: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  /**
   * Retrieves a list of a user's favorite movies by their username.
   *
   * @param username - The username of the user whose favorite movies are to be retrieved.
   * @returns An observable that displays an array of favorite movies or an error if the user has no favorites.
   */
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to the user's list of favorite movies by sending an HTTP PUT request to the server.
   *
   * @param movieId - The unique identifier of the movie to be added to the user's favorites.
   * @returns An observable that emits the result of the add-favorite request, which can be a success response or an error.
   */
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    
    return this.http.put(apiUrl + `users/${user.Username}/${movieId}`, {}, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError),
    );
  }

  /**
   * Edits a user's profile information by sending an HTTP PUT request to the server.
   *
   * @param updatedUser - An object containing the updated user profile data.
   * @returns An observable that emits the result of the edit request, which can be a success response or an error.
   */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user's account by sending an HTTP DELETE request to the server.
   *
   * @returns An observable that emits the result of the delete request, which can be a success response or an error.
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user._id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from the user's list of favorite movies.
   * @param movieId - The ID of the movie to remove from favorites.
   * @returns An observable representing the API response.
   */
  deleteFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const index = user.FavoriteMovies.indexOf(movieId);
    if (index >= 0) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));

    return this.http.delete(apiUrl + `users/${user.Username}/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param movieId 
   * @returns boolean value if user contains the movie in their FavoriteMovies
   */  
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      return user.FavoriteMovies.includes(movieId);
    }

    return false;
  }

  /**
   * Handles successful extraction of response data.
   * @param res - The API response object.
   * @returns The response body or an empty object.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles API request errors and logs them.
   * @param error - The HTTP error response.
   * @returns An observable with an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, Error body is:`, error.error
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
  
}
