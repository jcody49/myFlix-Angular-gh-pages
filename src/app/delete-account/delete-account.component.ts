import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss'],
  providers: [FetchApiDataService] // Add this line if not already added
})
export class DeleteAccountComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAccountComponent>,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar, // Add this line to properly inject MatSnackBar
    private router: Router // Inject the Router service
  ) {}

  // Function to delete the user account
  deleteUser(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    this.fetchApiData.deleteUser(user.Username).subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.dialogRef.close();
      this.snackBar.open('User account deleted successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['/welcome-page']);
    }, (error) => {
      console.error('Error deleting user account', error);
      this.snackBar.open('Error deleting user account', 'OK', {
        duration: 2000
      });
    });
  }

}
