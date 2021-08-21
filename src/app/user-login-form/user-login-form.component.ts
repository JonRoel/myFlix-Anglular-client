import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ 
  selector: 'app-user-login-form', 
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''} 

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { }
  // Function to send the form inputs to the Database
  userLogin(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      
      // Logic for successful user login
      this.dialogRef.close();
      // Set username and password for locall storage
      localStorage.setItem('username', result.user.username);
      localStorage.setItem('token', result.token);
      // Will most likely reditrect but for now can leave a note
      this.snackBar.open(result, 'Welcome back!', {
        duration: 3000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 3000
      });
    })
  }
}
