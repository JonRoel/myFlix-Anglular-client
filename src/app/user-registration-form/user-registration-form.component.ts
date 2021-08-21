import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({ // Decorator - Compenent is used to tell angular the class below is a component (export class...)
  selector: 'app-user-registration-form', // Defines cutom HTML Component
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '',} // @ is another decorator Input defines components inputs

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { // Gets called when all its inputs are received
  }
  // Function to send the form inputs to the Database
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => { // Calls the userData defined above and passes it into the function
      // Logic for successful user registration
      this.dialogRef.close();
      console.log(response)
      this.snackBar.open(response, 'Successfully Registered', {
        duration: 3000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 3000
      });
    })
  }
}
