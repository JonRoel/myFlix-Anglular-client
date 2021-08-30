import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

  constructor(

    /**
     * Uses inject to get director details
    */
    @Inject(MAT_DIALOG_DATA)
      public directorData: {
        name: string;
        bio: string;
        birthyear: string;
  }) { }

  ngOnInit(): void {
  }

}
