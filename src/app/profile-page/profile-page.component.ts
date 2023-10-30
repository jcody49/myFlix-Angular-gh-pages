import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { FavoriteMoviesComponent } from '../favorite-movies/favorite-movies.component';


/**
 * Represents a user.
 * @typedef {Object} User
 * @property {string} _id - The user's ID.
 * @property {string} Username - The user's username.
 * @property {string} Password - The user's password.
 * @property {string} Email - The user's email.
 * @property {Array} FavoriteMovies - An array of the user's favorite movies.
 */
type User = { _id?: string, Username?: string, Password?: string, Email?: string, FavoriteMovies?: [] }

/**
 * The ProfilePageComponent displays and allows users to edit their profile information.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  /**
   * The user's profile information.
   * @type {User}
   */
  user: User = {};

  @Input() userData = { Username: '', Password: '', Email: '' };
  
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      Username: user.Username || "",
      Email: user.Email || "",
      Password: ""
    }

    this.getUserFavorites(this.user.FavoriteMovies || []);
  }

  getUserFavorites(userFavorites: any[]): void{
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter(
        (m: { _id: any}) => userFavorites.indexOf(m._id) >= 0
      );
    });
  }

  /**
   * Retrieves user data from local storage.
   * @returns The user data.
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Updates the user's profile information and displays a success message.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result))
      this.user = result;
      this.snackBar.open('user updated!', 'OK', {
        duration: 2000
      })
    })
  }
  
  /**
   * Opens the delete account dialog.
   */
  openDeleteAccountDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountComponent, {
      width: '400px', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Call the deleteUser method from DeleteAccountComponent to handle account deletion
        dialogRef.componentInstance.deleteUser();
      }
    });
  }
  
}
