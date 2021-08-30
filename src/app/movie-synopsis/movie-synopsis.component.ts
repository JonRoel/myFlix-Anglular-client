import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss']
})
export class MovieSynopsisComponent implements OnInit {
  constructor(

    /**
     * Uses inject to get the movie details
    */
    @Inject(MAT_DIALOG_DATA)
    public movieSynopsis: {
      Title: string;
      description: string;
      trailerUrl: string;
    },
  ) { }

  
  ngOnInit(): void {
  }

}
