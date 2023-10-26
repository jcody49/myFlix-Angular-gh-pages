import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';



/**
 * The UserLoginFormComponent handles user login and sends form inputs to the backend
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Logs in the user, sends form inputs to the backend, and handles success and failure.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close();
      this.snackBar.open('user logged in successfully!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);

    }, (result) => {
      this.snackBar.open('User login failed', 'OK', {
        duration: 2000
      });
    });
  }

}