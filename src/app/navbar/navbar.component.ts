import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * The NavbarComponent displays the navigation bar at the top of the app
 * It provides options for user navigation and logout
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) { }

  /**
   * Logs out the user by removing user and token information from local storage
   * and redirects the user to the welcome page.
   */
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}