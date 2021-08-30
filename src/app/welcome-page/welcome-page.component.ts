import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  /**
   * Opens registration form in a MatDialog modal
  */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px'
    });
  }

  /**
   * Opens login form in MatDialog modal
  */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '400px'
    });
  }
}

