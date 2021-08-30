import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-jonathon.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
 // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * @param userData  Provided from API, Username, Password, Email, Birthday, Favorites.
  */
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'users', userData).pipe(
    catchError(this.handleError)
    );
  }

  /**
    * Returns endpoint for user login.
  */
  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(apiUrl + 'login', userData).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Delete user profile
   * Username required.
  */
  public deleteUser(): Observable<any> {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Fetch all movies
   * @retuns All movies.
  */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetch single user details
   * @param user Username is required.
   * @returns User details
  */
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + user, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update user details
   * @param userDetails Fetched from input forn, exludes Username. If included will return 500 error
   * @param user Username required
   * @returns Updates users details
  */
  editUserProfile(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    return this.http.put(apiUrl + 'userupdate/' + user, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  /**
   * Fetch Single movie details
  */
  getMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetch single director details from directors collection
  */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/:name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetch genre details from genre collection
  */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genre/:name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Add movie to User Favorites list
   * @param user Username required
   * @param id Movie id required
   * @returns will add to users favorites list
  */
  public addToFavoriteMoviesList(id: string): Observable<any> {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/addtofavs/' + user + '/' + id, id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  /**
   * Remove movie from users Favorites list
   * @param user Username required
   * @param id Movie id required
  */
  removeFavoriteMovie(id: string): Observable<any> {
    const user = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/removefromfavs/' + user + '/' + id, id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: any | object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}