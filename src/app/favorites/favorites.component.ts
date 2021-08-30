import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  isLoading = false;
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  faves: any[] = [];
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  getUsersFavs(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.faves = resp.Favorites;
      console.log(this.faves);
      return this.faves;
    });
  }

  getUser(): void {
    let user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  getMovies(): void {
    this.isLoading = true;
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.isLoading = false;
      this.movies = resp;
      console.log(this.movies);
      return this.filterFavorites(); // Calls the filter function when calling movies to show only favorites
    });
  }

  /**
   * Filters movies to display only the users favorites
  */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.faves.includes(movie._id)) {
        this.favorites.push(movie);
      }console.log(this.favorites);
    });
    return this.favorites; // Calls a reload for a dynamic removal from list
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {name, description},
      width: '650px'
    });
  }

  openDirectorDialog(name: string, bio: string, birthyear: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {name, bio, birthyear},
      width: '650px'
    });
  }

  openMovieSynopsis(Title: string, description: string, trailerUrl: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: { Title, description, trailerUrl },
      width: '650px'
    });
  }

  addToFavoriteMoviesList(id: string, Title: string): void {
    this.fetchApiData.addToFavoriteMoviesList(id).subscribe((res: any) => {
      //let favMovies = res.Favorites;
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getUsersFavs();
    })
  }

  removeFromFavorites(id: string, Title: string): void {
   this.fetchApiData.removeFavoriteMovie(id).subscribe((res: any) => {
     //let favMovies = res.Favorites;
     this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
       duration: 3000,
     })
     setTimeout(function () {
      window.location.reload();
     }, 3500);
     return this.getUsersFavs();
   })
  }

  /**
   * Allows for dynamic loading of favorites icon to display on/off of favorites
  */
  setFaveStatus(id: any): any {
    if (this.faves.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}