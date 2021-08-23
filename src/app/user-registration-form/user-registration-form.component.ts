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
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => { 
      // Logic for successful user registration
      this.dialogRef.close();
      console.log(result)
      this.snackBar.open(result, 'Successfully Registered you can now login!', {
        duration: 3000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 3000
      });
    })
  }
}
