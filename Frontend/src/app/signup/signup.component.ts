import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService: UserService, private router: Router) { }

  public user = {
    fullname: '',
    username: '',
    password: '',
    email: '',
    phoneno: '',
  };

  integerRegex = /^\d+$/

  ngOnInit(): void { }

  formSubmit() {
    this.userService.addUser(this.user).subscribe((data) => {
      console.log(data);
      Swal
        .fire('Success', 'User Registered Successfully !!', 'success')
        .then(() => {
          this.router.navigateByUrl("/login");
        })

    }, (error) => {
      console.log(error);
      Swal.fire('Oops..!!', 'Something went wrong !!', 'error');
    })

  }
}
