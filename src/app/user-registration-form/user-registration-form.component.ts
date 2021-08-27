import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ 
  selector: 'app-user-registration-form', 
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  isLoading = false;

  @Input() userData = { 
    Username: '', 
    Password: '', 
    Email: '', 
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { }

  // Function to send the form inputs to the Database
  registerUser(): void {
    this.isLoading = true;
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.isLoading = false; 
      // Logic for successful user registration
      this.dialogRef.close();
      console.log(response)
      this.snackBar.open(this.userData.Username, 'Successfully Registered you can now login!', {
        duration: 3000
      });
    }, (response) => {
      this.isLoading = false;
      this.snackBar.open(response, 'OK', {
        duration: 3000
      });
    })
  }
}
