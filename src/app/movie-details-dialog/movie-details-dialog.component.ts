import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * The MovieDetailsDialogComponent is a dialog component that displays movie details.
 * It receives the title and content to be displayed in the dialog from the parent component.
 */
@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.scss']
})
export class MovieDetailsDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      content: string,
    }
  ) { }

  ngOnInit(): void { }

}