import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss']
})
export class MovieSynopsisComponent implements OnInit {
  safeSrc: SafeResourceUrl;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public movieSynopsis: {
      Title: string;
      description: string;
      trailerUrl: string;
    },
    private sanitizer: DomSanitizer
  ) { this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(movieSynopsis.trailerUrl); }

  
  ngOnInit(): void {
  }

}
