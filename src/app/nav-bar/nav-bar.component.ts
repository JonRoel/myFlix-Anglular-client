import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  userDetails: any;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }
  
  /**
   * Gets user details, used to display username in the nav bar
  */
  public getUserDetails(): void {
    this.userDetails = localStorage.getItem('username');
  }

  signOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }
}
